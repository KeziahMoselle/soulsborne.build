import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'

import { z, ZodError } from 'zod'
import { NextRequest } from 'next/server'

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
})

export const POST = async (req: NextRequest) => {
  const requestBody = await req.json()
  const headers = getHeaders()
  const payload = await getPayload({
    config: configPromise,
  })
  // @ts-ignore
  const { user } = await payload.auth({ headers, req })

  if (user) {
    return Response.json({ message: 'Already logged in.' })
  }
  try {
    const body = bodySchema.parse(requestBody)

    const user = await payload.create({
      collection: 'users',
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        roles: ['user'],
      },
    })

    return Response.json({ success: true, user })
  } catch (error) {
    if (error instanceof ZodError) {
      payload.logger.error(`${error.message} ${error.issues.map((e) => e.message).join(', ')}`)

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

  return Response.json({})
}
