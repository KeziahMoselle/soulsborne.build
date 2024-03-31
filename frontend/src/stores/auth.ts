import { persistentAtom } from '@nanostores/persistent';

export const $user = persistentAtom('user', null, {
  encode (value) {
    return JSON.stringify(value)
  },
  decode (value) {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
});