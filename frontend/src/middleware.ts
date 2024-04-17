import type { UserJWT } from '@/types'
import { defineMiddleware, sequence } from 'astro:middleware'

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}


const auth = defineMiddleware(async ({ cookies, locals }, next) => {
  try {
    const user: UserJWT = parseJwt(cookies.get('payload-token')?.value)

    locals.user = user
    return next()
  } catch {
    locals.user = null
    return next()
  }
})

export const onRequest = sequence(auth)
