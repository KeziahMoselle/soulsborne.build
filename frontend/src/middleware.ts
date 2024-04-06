import type { PayloadUserResponse } from "@/types";
import { defineMiddleware, sequence } from "astro:middleware"

const auth = defineMiddleware(async ({ cookies, locals }, next) => {
  if (!cookies.has('payload-token')) {
    locals.user = null
    return next()
  }

  const data: PayloadUserResponse = await fetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/me`, {
    headers: {
      'Cookie': `payload-token=${cookies.get('payload-token').value}`
    },
  }).then((res) => res.json())

  locals.user = data?.user
  return next()
})

export const onRequest = sequence(auth)