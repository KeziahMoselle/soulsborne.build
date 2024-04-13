import type { PayloadCollection } from '@/types'
import type { ErBuild } from '@payload-types'
import { toast } from 'vue-sonner'
import qs from 'qs'

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return fetchJSON(`${import.meta.env.PUBLIC_PAYLOAD_URL}${endpoint}`, options)
}

export async function fetchJSON<T>(url: string, options: RequestInit = {}): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Add credentials on client only
  if (!import.meta.env.SSR) {
    defaultOptions['credentials'] = 'include'
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  const result = await fetch(`${url}`, mergedOptions).then(async (res) => {
    const json = await res.json() as T

    if (res.ok) {
      return json
    }

    throw new Error(
      // @ts-ignore
      json.message ? json.message : `Error fetching page data: ${res.statusText} (${res.status})}`
    )
  })

  return result
}

interface ILoginPayload {
  email: string
  password: string
}

export async function login(payload: ILoginPayload) {
  const login = fetchJSON(`/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  let isSuccess = false

  toast.promise(login, {
    loading: 'Logging in...',
    success(response) {
      isSuccess = true
      location.href = '/'
      // @ts-ignore
      return `Welcome ${response.user.name}!`
    },
    error: () => {
      return 'There was an error'
    }
  })

  return isSuccess
}

export interface IRegisterPayload {
  email: string
  name: string
  password: string
}

export async function register(payload: IRegisterPayload) {
  const login = fetchJSON(`/api/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  let isSuccess = false

  toast.promise(login, {
    loading: 'Creating your account...',
    success() {
      isSuccess = true
      location.href = '/login'
      return `Successfully registered!`
    },
    error: (error) => {
      // @ts-ignore
      return error.message
    }
  })

  return isSuccess
}

export async function logout() {
  const logout = fetchJSON(`/api/users/logout`, {
    method: 'POST',
  })

  toast.promise(logout, {
    loading: 'Loading...',
    success() {
      location.href = '/'
      return `You have been logged out.`
    },
    error: () => {
      return 'There was an error'
    }
  })
}

export async function getMostVotedBuilds({ limit, page }: { limit: number; page: number }) {
  const stringifiedQuery = qs.stringify(
    {
      sort: 'votes',
      limit,
      page,
    },
    { addQueryPrefix: true },
  )
  const url = `/api/er-builds${stringifiedQuery}`

  const builds = await apiFetch<PayloadCollection<ErBuild>>(url)

  return builds
}

export async function toggleVoteBuild({ buildId }) {
  const updatedBuild = await apiFetch<ErBuild>(`/api/er-builds/toggle-vote`, {
    method: 'POST',
    body: JSON.stringify({
      buildId
    })
  })

  return updatedBuild
}