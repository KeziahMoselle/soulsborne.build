import type { PayloadCollection } from './types';
import qs from "qs";
import type { User, ErWeapon } from '@/payload/payload-types';

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
}

export function login(payload: ILoginPayload): Promise<ILoginResponse> {
  return apiFetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logout() {
  return apiFetch(`${import.meta.env.PUBLIC_PAYLOAD_URL}/api/users/logout`, {
    method: 'POST',
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