import type { PayloadUserResponse } from "@/types";
import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  const payloadToken = cookies.get('payload-token').value

  if (!payloadToken) {
    locals.user = null
    return next()
  }

  const data: PayloadUserResponse = await fetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/me`, {
    headers: {
      'Cookie': `payload-token=${payloadToken}`
    },
  }).then((res) => res.json())

  locals.user = data?.user
  return next()
})