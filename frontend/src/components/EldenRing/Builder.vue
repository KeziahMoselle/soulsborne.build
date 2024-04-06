<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import RelationSelect from '@/components/EldenRing/RelationSelect.vue'

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
import { Checkbox } from '@/components/ui/checkbox'

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
  // Build informations
  name: z.string().min(2).max(255),
  is_two_handed: z.boolean().default(false).optional(),
  youtube_url: z.string().url({ message: "Invalid url" }).optional(),
  // Equipment
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

  /**
   * Request body
   * Will be sent to PayloadCMS
   */
  const build: Partial<ErBuild> = {
    name: values.name,
    is_two_handed: values.is_two_handed,
    youtube_url: values.youtube_url,
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
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="is_two_handed">
      <FormItem class="flex flex-row items-center gap-x-3 p-4 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:checked="handleChange" />
        </FormControl>
        <FormLabel>two handed</FormLabel>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="youtube_url">
      <FormItem>
        <FormLabel>Build demo (youtube video)</FormLabel>
        <FormControl>
          <Input
            type="url"
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            pattern="https://.*"
            v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Equipment -->
    <div class="grid md:first:grid-cols-2">
      <!-- Mainhand, offhand, armor, talismans... -->
      <div>
        <div class="grid grid-cols-er-builder" v-for="row in FORM">
          <div v-for="input in row">
            <RelationSelect :key="input.name" v-bind="input" />
          </div>
        </div>
      </div>

      <!-- Statistics -->
    </div>

    <div class="flex justify-center mt-12">
      <button class="button" type="submit">
        Create
      </button>
    </div>
  </form>
</template>