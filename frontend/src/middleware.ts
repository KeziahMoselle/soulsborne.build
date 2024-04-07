import type { PayloadUserResponse } from "@/types";
import { defineMiddleware, sequence } from "astro:middleware"

const FORBID_ALREADY_LOGGED_ROUTES = [
  '/register',
  '/login'
]

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

const alreadyLoggedIn = defineMiddleware((context, next) => {
  if (!context.locals.user) {
    return next()
  }

  if (FORBID_ALREADY_LOGGED_ROUTES.includes(context.url.pathname)) {
    return context.redirect('/', 302)
  }

  return next()
})

export const onRequest = sequence(auth, alreadyLoggedIn)