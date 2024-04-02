import type { APIRoute } from "astro"

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(import.meta.env.PUBLIC_PAYLOAD_URL)
  const requestUrl = new URL(request.url)

  return new URL(requestUrl.pathname, proxyUrl)
}

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request)
  const response = await fetch(proxyUrl.href, request)
  const json = await response.json()

  return new Response(response.body, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  })
}