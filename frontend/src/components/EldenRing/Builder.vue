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
import type { Archetype, ErBuild, ErStatistic, Restriction } from '~/payload-types'
import { toast } from 'vue-sonner'
import { Checkbox } from '@/components/ui/checkbox'
import Statistics from '@/components/EldenRing/Statistics.vue'
import type { PayloadCreateResponse, PayloadCollection } from '@/types'
import Tags from '@/components/Form/Tags.vue'

const props = defineProps<{
  stats: PayloadCollection<ErStatistic>,
  archetypes: PayloadCollection<Archetype>,
  restrictions: PayloadCollection<Restriction>
}>()

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

const statsSchema = props.stats.docs.reduce((acc, value) => {
  acc[`stat-${value.id}`] = z.number().min(0).max(99)
  return acc
}, {})

const formSchema = toTypedSchema(z.object({
  // Build informations
  name: z.string().min(2).max(255),
  is_two_handed: z.boolean().default(false).optional(),
  youtube_url: z.string().url({ message: "Invalid url" }).optional(),
  archetypes: z.array(z.number()),
  restrictions: z.array(z.number()),
  'stat-1': z.number().min(0).max(99),
  'stat-2': z.number().min(0).max(99),
  'stat-3': z.number().min(0).max(99),
  'stat-4': z.number().min(0).max(99),
  'stat-5': z.number().min(0).max(99),
  'stat-6': z.number().min(0).max(99),
  'stat-7': z.number().min(0).max(99),
  'stat-8': z.number().min(0).max(99),
  ...statsSchema,
  // Equipment
  'mainhand-1': z.string().optional(),
  'mainhand-ash-1': z.string().optional(),
  'mainhand-affinity-1': z.string().optional(),
  'mainhand-2': z.string().optional(),
  'mainhand-ash-2': z.string().optional(),
  'mainhand-affinity-2': z.string().optional(),
  'mainhand-3': z.string().optional(),
  'mainhand-ash-3': z.string().optional(),
  'mainhand-affinity-3': z.string().optional(),
  'bolt-1': z.string().optional(),
  'bolt-2': z.string().optional(),
  'offhand-1': z.string().optional(),
  'offhand-ash-1': z.string().optional(),
  'offhand-affinity-1': z.string().optional(),
  'offhand-2': z.string().optional(),
  'offhand-ash-2': z.string().optional(),
  'offhand-affinity-2': z.string().optional(),
  'offhand-3': z.string().optional(),
  'offhand-ash-3': z.string().optional(),
  'offhand-affinity-3': z.string().optional(),
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

const { handleSubmit, values, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    "stat-1": 10,
    "stat-2": 10,
    "stat-3": 10,
    "stat-4": 10,
    "stat-5": 10,
    "stat-6": 10,
    "stat-7": 10,
    "stat-8": 10,
  }
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)

  const mainhands = [values['mainhand-1'], values['mainhand-2'], values['mainhand-3']].filter(Boolean).map((item, index) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id,
      ashId: values[`mainhand-ash-${index + 1}`]?.split(':')[1],
      affinityId: values[`mainhand-affinity-${index + 1}`]?.split(':')[1],
    }
  })
  const offhands = [values['offhand-1'], values['offhand-2'], values['offhand-3']].filter(Boolean).map((item, index) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id,
      ashId: values[`offhand-ash-${index + 1}`]?.split(':')[1],
      affinityId: values[`offhand-affinity-${index + 1}`]?.split(':')[1],
    }
  })
  const armorIds = [values.helm, values.chest, values.gauntlet, values.leg].filter(Boolean).map((armor) => Number(armor.split(':')[1]))
  const talismanIds = [values['talisman-1'], values['talisman-2'], values['talisman-3'], values['talisman-4']].filter(Boolean).map((talisman) => Number(talisman.split(':')[1]))

  const statistics = props.stats.docs.map((stat) => {
    const value = values[`stat-${stat.id}`]

    return {
      stat: stat.id,
      value
    }
  })

  /**
   * Request body
   * Will be sent to PayloadCMS
   */
  const build: Partial<ErBuild> = {
    name: values.name,
    is_two_handed: values.is_two_handed,
    youtube_url: values.youtube_url,
    archetype: values.archetypes,
    restrictions: values.restrictions,
    mainhand_weapons: mainhands.map((item) => ({
      weapon: Number(item.id),
      ash_of_war: Number(item.ashId),
      affinity: Number(item.affinityId)
    })),
    offhand_weapons: offhands.map((item) => ({
      [item.name]: Number(item.id),
      ash_of_war: Number(item.ashId),
      affinity: Number(item.affinityId)
    })),
    armors: armorIds,
    talismans: talismanIds,
    statistics
  }

  const createBuild = apiFetch<PayloadCreateResponse<ErBuild>>(`/api/er-builds`, {
    method: 'POST',
    body: JSON.stringify(build)
  })

  toast.promise(createBuild, {
    loading: 'Creating your build...',
    success(response) {
      if (import.meta.env.PROD) {
        setTimeout(() => {
          location.href = `/build/${response.doc.id}`
        }, 2000);
      } else {
        toast.info('Skipped redirection because of DEV mode.')
      }
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
  <form class="mt-4" @submit.prevent="onSubmit">
    <!-- Build informations -->
    <div class="grid grid-cols-2">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel class="flex justify-between">
            <span>Name</span>
            <FormMessage />
          </FormLabel>
          <FormControl>
            <Input type="text" placeholder="My awesome build" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex justify-end items-end">
        <Tags
          label="archetypes"
          name="archetypes"
          :docs="archetypes" />
        <Tags
          label="restrictions"
          name="restrictions"
          :docs="restrictions" />
      </div>
    </div>
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
    <div class="grid md:grid-cols-12">
      <!-- Mainhand, offhand, armor, talismans... -->
      <div class="md:col-span-6">
        <div class="grid grid-cols-er-builder" v-for="row in FORM">
          <div v-for="input in row" class="relative">
            <RelationSelect
              :key="input.name"
              v-bind="input"
              :values="values"
              :set-values="setValues" />

              <RelationSelect
                v-if="input.type === 'mainhand' || input.type === 'offhand'"
                :key="`${input.name.split('-')[0]}-ash-${input.name.split('-')[1]}`"
                :name="`${input.name.split('-')[0]}-ash-${input.name.split('-')[1]}`"
                type="ash"
                :relation-to="['er-ashes-of-war']"
                :values="values"
                :set-values="setValues" />

              <RelationSelect
                v-if="input.type === 'mainhand' || input.type === 'offhand'"
                :key="`${input.name.split('-')[0]}-affinity-${input.name.split('-')[1]}`"
                :name="`${input.name.split('-')[0]}-affinity-${input.name.split('-')[1]}`"
                type="affinity"
                :relation-to="['er-affinities']"
                :values="values"
                :set-values="setValues" />
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="md:col-start-11 md:col-span-2 mt-4">
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="is_two_handed">
          <FormItem class="flex flex-row items-center gap-x-3 mb-2 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <FormLabel>two handed</FormLabel>
            <FormMessage />
          </FormItem>
        </FormField>

        <Statistics :stats="stats.docs" />
      </div>
    </div>

    <div class="flex justify-center mt-12">
      <button class="button" type="submit">
        Create
      </button>
    </div>
  </form>
</template>