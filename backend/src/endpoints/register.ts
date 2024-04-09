import type { PayloadHandler } from 'payload/config'
import { z, ZodError } from 'zod'

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string()
})

export const register: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (user) {
    res.status(401).json({ message: 'Already logged in.' })
    return
  }


  try {
    const body = bodySchema.parse(req.body)

    const user = await payload.create({
      collection: 'users',
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        roles: ['user']
      }
    })

    res.json({ success: true, user })
  } catch (error) {
    if (error instanceof ZodError) {
      payload.logger.error(`[${req.body.email}] ${error.message} ${error.issues.map((e) => e.message).join(', ')}`)

      res.status(400).json({
        ...error
      })
      return
    }

    if (error instanceof Error) {
      payload.logger.error(`[${req.body.email}] ${error.message}`)
      res.status(400).json({ ...error })
    }
  }
}