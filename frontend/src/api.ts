import type { PayloadCollection } from './types';
import qs from "qs";
import { toast } from 'vue-sonner'
import type { ErWeapon } from '~/payload-types';
import { $user } from './stores/auth';

export async function apiFetch(url: string, options: any = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const result = await fetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}${url}`, mergedOptions).then(async (res) => {
    const json = await res.json()

    if (res.ok) {
      return json
    }

    throw new Error(
      json.message ? json.message : `Error fetching page data: ${res.statusText} (${res.status})}`
    );
  });

  return result
}

interface ILoginPayload {
  email: string;
  password: string;
}

export async function login(payload: ILoginPayload) {
  const login = apiFetch(`/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  toast.promise(login, {
    loading: 'Logging in...',
    success(response) {
      $user.set(response.user)
      return `Welcome ${response.user.email}!`
    },
    error: () => {
      $user.set(null)
      return 'There was an error'
    }
  })
}

export interface IRegisterPayload {
  email: string;
  name: string;
  password: string;
}

export async function register(payload: IRegisterPayload) {
  const login = apiFetch(`/api/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  let isSuccess = false

  await toast.promise(login, {
    loading: 'Creating your account...',
    success(response) {
      isSuccess = true
      return `Successfully registered!`
    },
    error: (error) => {
      $user.set(null)
      return error.message
    }
  })

  return isSuccess
}

export async function logout() {
  const logout = apiFetch(`/api/users/logout`, {
    method: 'POST',
  })

  toast.promise(logout, {
    loading: 'Loading...',
    success() {
      $user.set(null)
      return `You have been logged out.`
    },
    error: () => {
      $user.set(null)
      return 'There was an error'
    }
  })
}

export async function getWeapons(query: any = null): Promise<PayloadCollection<ErWeapon>> {
  const stringifiedQuery = qs.stringify(
    query,
    { addQueryPrefix: true }
  );

  return apiFetch(
    `/api/er-weapons${stringifiedQuery}`
  )
}