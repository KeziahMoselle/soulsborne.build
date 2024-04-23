import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { z, ZodError } from 'zod'
import { NextRequest } from 'next/server'

const bodySchema = z.object({
  email: z.string().email(),
})

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const payload = await getPayload({
    config: configPromise,
  })

  try {
    const { email } = bodySchema.parse(body)

    const result = await payload.create({
      collection: 'preregistrations',
      data: {
        email: email.toLowerCase(),
      },
    })

    return Response.json(result)
  } catch (error) {
    if (error instanceof ZodError) {
      payload.logger.error(`${error.message}: ${error.issues.map((e) => e.message).join(', ')}`)

      return new Response(JSON.stringify(error), {
        status: 400,
      })
    }

    if (error instanceof Error) {
      payload.logger.error(error.message)
      return new Response(JSON.stringify(error), {
        status: 400,
      })
    }
  }
}
