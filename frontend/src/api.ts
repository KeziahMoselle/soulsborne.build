import type { PayloadCollection } from './types';
import qs from "qs";
import { toast } from 'vue-sonner'
import type { User, ErWeapon } from '@/payload/payload-types';
import { $user } from './stores/auth';

function apiFetch(url: string, options: any = {}) {
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

  return fetch(url, mergedOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(
      `Error fetching page data: ${res.statusText} (${res.status})}`
    );
  });
}

interface ILoginPayload {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: User;
  token: string;
  exp: number;
}

export async function login(payload: ILoginPayload) {
  const login = apiFetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  toast.promise(login, {
    loading: 'Loading...',
    success(response) {
      $user.set(response.user)
      return `Welcome ${response.user.email}!`
    },
    error: () => {
      $user.set(null)
      return 'There was en error'
    }
  })
}

export async function logout() {
  const logout = apiFetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/logout`, {
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
      return 'There was en error'
    }
  })
}

export async function getWeapons(query: any = null): Promise<PayloadCollection<ErWeapon>> {
  const stringifiedQuery = qs.stringify(
    query,
    { addQueryPrefix: true }
  );

  return apiFetch(
    `${import.meta.env.PUBLIC_PAYLOAD_URL}/api/er-weapons${stringifiedQuery}`
  )
}