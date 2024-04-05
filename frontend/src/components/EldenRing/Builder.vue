<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import RelationSelect from '@/components/EldenRing/RelationSelect.vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { apiFetch } from '@/api'
import type { ErBuild } from '~/payload-types'
import { toast } from 'vue-sonner'


export interface IFormItem {
  name: string;
  type: string;
  relationTo: string[] | {
    slug: string;
    query: any;
  }[];
}

const FORM = [
  [
    {
      name: 'mainhand-1',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'mainhand-2',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'mainhand-3',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'bolt-1',
      type: 'bolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Bolt'
            }
          } */
        }
      ],
    },
    {
      name: 'bolt-2',
      type: 'bolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Bolt'
            }
          } */
        }
      ],
    },
  ],
  [
    {
      name: 'offhand-1',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-2',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-3',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'greatbolt-1',
      type: 'greatbolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Greatbolt'
            }
          } */
        }
      ],
    },
    {
      name: 'greatbolt-2',
      type: 'greatbolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Greatbolt'
            }
          } */
        }
      ],
    },
  ],
  [
    {
      name: 'helm',
      type: 'helm',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Helm'
            },
          }
        },
      ],
    },
    {
      name: 'chest',
      type: 'chest',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Chest'
            },
          }
        },
      ],
    },
    {
      name: 'gauntlet',
      type: 'gauntlet',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Gauntlet'
            },
          }
        },
      ],
    },
    {
      name: 'leg',
      type: 'leg',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Leg'
            },
          }
        },
      ],
    },
  ],
  [
    {
      name: 'talisman-1',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-2',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-3',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-4',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
  ],
]

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(255),
  'mainhand-1': z.string().optional(),
  'mainhand-2': z.string().optional(),
  'mainhand-3': z.string().optional(),
  'bolt-1': z.string().optional(),
  'bolt-2': z.string().optional(),
  'offhand-1': z.string().optional(),
  'offhand-2': z.string().optional(),
  'offhand-3': z.string().optional(),
  'greatbolt-1': z.string().optional(),
  'greatbolt-2': z.string().optional(),
  helm: z.string().optional(),
  chest: z.string().optional(),
  gauntlet: z.string().optional(),
  leg: z.string().optional(),
  'talisman-1': z.string().optional(),
  'talisman-2': z.string().optional(),
  'talisman-3': z.string().optional(),
  'talisman-4': z.string().optional(),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)

  const mainhands = [values['mainhand-1'], values['mainhand-2'], values['mainhand-3']].filter(Boolean).map((item) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id
    }
  })
  const offhands = [values['mainhand-1'], values['mainhand-2'], values['mainhand-3']].filter(Boolean).map((item) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id
    }
  })
  const armorIds = [values.helm, values.chest, values.gauntlet, values.leg].filter(Boolean).map((armor) => Number(armor.split(':')[1]))
  const talismanIds = [values['talisman-1'], values['talisman-2'], values['talisman-3'], values['talisman-4']].filter(Boolean).map((talisman) => Number(talisman.split(':')[1]))

  const build: Partial<ErBuild> = {
    name: values.name,
    mainhand_weapons: mainhands.map((item) => ({
      weapon: Number(item.id)
    })),
    offhand_weapons: offhands.map((item) => ({
      [item.name]: Number(item.id)
    })),
    armors: armorIds,
    talismans: talismanIds,
  }

  const createBuild = apiFetch(`/api/er-builds`, {
    method: 'POST',
    body: JSON.stringify(build)
  })

  toast.promise(createBuild, {
    loading: 'Creating your build...',
    success(response) {
      console.log(response)
      return `Successfully created! Redirecting to your build...`
    },
    error: (error) => {
      console.error(error)
      return 'There was an error'
    }
  })
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- Build informations -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="My awesome build" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Equipment -->
    <div class="grid grid-cols-5" v-for="row in FORM">
      <div v-for="input in row">
        <RelationSelect :key="input.name" v-bind="input" />
      </div>
    </div>

    <button type="submit">
      Create
    </button>
  </form>
</template>