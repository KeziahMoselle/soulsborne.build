import type { PayloadHandler } from 'payload/config'

export const register: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (user) {
    res.status(401).json({ message: 'Already logged in.' })
    return
  }

  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roles: ['user']
      }
    })

    res.json({ success: true, user })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    // @ts-ignore
    payload.logger.error(`${message} ${error?.data?.map((e) => e.message).join(', ')}`)
    res.status(400).json({
      error: message,
      // @ts-ignore
      message: error?.data?.map((e) => e.message).join(', ')
    })
  }
}