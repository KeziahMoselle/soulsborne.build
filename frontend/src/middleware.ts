import { apiFetch } from "@/api";
import type { PayloadUserResponse } from "@/types";
import { defineMiddleware, sequence } from "astro:middleware"

const auth = defineMiddleware(async ({ cookies, locals, redirect }, next) => {
  if (!cookies.has('payload-token')) {
    locals.user = null
    return next()
  }

  let data: PayloadUserResponse
  try {
    data = await apiFetch('/api/users/me', {
      headers: {
        'Cookie': `payload-token=${cookies.get('payload-token').value}`
      },
    })
  } catch (error) {
    console.error(error)
    return next()
  }

  // If data.user is null that means the token expired
  // TODO: Refresh token here
  if (!data.user) {
    cookies.delete('payload-token')
    return redirect('/?logged-out')
  }

  locals.user = data.user
  return next()
})

export const onRequest = sequence(auth)