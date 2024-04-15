import { Field } from "payload/types";

export const GameSelectField: Field = {
  name: 'game',
  label: 'Game',
  type: 'select',
  admin: {
    position: 'sidebar'
  },
  options: [
    {
      label: 'Elden Ring',
      value: 'er'
    },
    {
      label: 'Dark Souls',
      value: 'ds'
    },
    {
      label: 'DARK SOULS II',
      value: 'ds2'
    },
    {
      label: 'DARK SOULS III',
      value: 'ds3'
    },
    {
      label: 'Bloodborne',
      value: 'bb'
    },
  ]
}