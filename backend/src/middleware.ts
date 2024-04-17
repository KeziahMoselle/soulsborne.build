import { NextResponse } from 'next/server'

export const ALLOWED_ORIGINS = [
  // Back
  'https://payload.soulsborne.build',
  'http://localhost:3000',
  // Front
  'https://soulsborne.build',
  'https://soulsborne-build.pages.dev',
  'http://localhost:4321',
]

export function middleware(req) {
  const res = NextResponse.next()

  const origin = req.headers.get('origin')

  if (ALLOWED_ORIGINS.includes(origin)) {
    res.headers.append('Access-Control-Allow-Origin', origin)
  }

  res.headers.append('Access-Control-Allow-Credentials', 'true')
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  return res
}

export const config = {
  matcher: '/api/:path*',
}
