import type { PayloadHandler } from 'payload/config'
import { z, ZodError } from 'zod'

const bodySchema = z.object({
  buildId: z.number(),
})

export const toggleVote: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const { buildId } = bodySchema.parse(req.body)

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

    res.json(result)
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