import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { z, ZodError } from 'zod'
import { NextRequest } from 'next/server'

const bodySchema = z.object({
  buildId: z.number(),
})

export const POST = async (req: NextRequest) => {
  const headers = getHeaders()
  const body = await req.json()

  const payload = await getPayload({
    config: configPromise,
  })

  // @ts-ignore
  const { user } = await payload.auth({ headers, req })

  if (!user) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401
    })
  }

  try {
    const { buildId } = bodySchema.parse(body)

    const build = await payload.findByID({
      collection: 'er-builds',
      id: buildId,
      depth: 0,
    })

    const indexOfVote = build.votes.indexOf(user.id)

    if (indexOfVote > -1) {
      build.votes.splice(indexOfVote, 1)
    } else {
      build.votes.push(user.id)
    }

    const result = await payload.update({
      collection: 'er-builds',
      id:buildId,
      depth: 0,
      data: {
        votes: build.votes,
        votes_count: build.votes.length
      }
    })

    return Response.json(result)
  } catch (error) {
    if (error instanceof ZodError) {
      payload.logger.error(`${error.message}: ${error.issues.map((e) => e.message).join(', ')}`)

      return new Response(JSON.stringify(error), {
        status: 400
      })
    }

    if (error instanceof Error) {
      payload.logger.error(error.message)
      return new Response(JSON.stringify(error), {
        status: 400
      })
    }
  }
}
