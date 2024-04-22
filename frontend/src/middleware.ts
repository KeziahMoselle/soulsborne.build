import type { UserJWT } from '@/types'
import { defineMiddleware, sequence } from 'astro:middleware'

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}

const AUTHORIZED_BETA_PATHNAMES = ['/', '/builds', '/fashion', '/login']

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

const beta = defineMiddleware(async ({ locals, url, redirect }, next) => {
  try {
    if (locals.user) {
      return next()
    }

    if (AUTHORIZED_BETA_PATHNAMES.includes(url.pathname)) {
      return next()
    }

    return redirect('/', 307)
  } catch {
    return redirect('/', 307)
  }
})

export const onRequest = sequence(auth, beta)
