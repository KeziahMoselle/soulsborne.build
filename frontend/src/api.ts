import { toast } from 'vue-sonner'

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  return fetchJSON(`${import.meta.env.PUBLIC_PAYLOAD_URL}${endpoint}`, options)
}

export async function fetchJSON(url: string, options: RequestInit = {}) {
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
    const json = await res.json()

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
      return `You have been logged out.`
    },
    error: () => {
      return 'There was an error'
    }
  })
}