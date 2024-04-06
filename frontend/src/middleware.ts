import type { PayloadUserResponse } from "@/types";
import { sequence } from "astro:middleware"

const FORBID_ALREADY_LOGGED_ROUTES = [
  '/register',
  '/login'
]

async function auth({ cookies, locals }, next) {
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
}

function alreadyLoggedIn(context, next) {
  if (context.locals.user && FORBID_ALREADY_LOGGED_ROUTES.includes(context.url.pathname)) {
    return context.redirect('/', 301)
  }

  return next()
}

export const onRequest = sequence(auth, alreadyLoggedIn)