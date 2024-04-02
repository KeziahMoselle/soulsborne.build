import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  const token = cookies.get("payload-token")?.value;

  if (!token) {
    locals.user = null;
    return next()
  }

  const data = await fetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/me`, {
    credentials: 'include',
    headers: {
      'Cookie': `payload-token=${token}`
    },
  }).then((res) => res.json())

  locals.user = data?.user;
  return next();
});