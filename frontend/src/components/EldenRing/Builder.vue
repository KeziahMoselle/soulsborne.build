<script setup lang="ts">
import type { Archetype, ErBuild, ErStatistic, ErClass, Restriction } from '@payload-types'
import type { PayloadCreateResponse, PayloadCollection, PayloadMediaResponse } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import RelationSearch from '@/components/EldenRing/RelationSearch.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { apiFetch } from '@/api'
import { toast } from 'vue-sonner'
import { Checkbox } from '@/components/ui/checkbox'
import Statistics from '@/components/EldenRing/Statistics.vue'
import Tags from '@/components/Form/Tags.vue'
import Editor from '@/components/organisms/Editor/index.vue'
import { computed, ref, unref } from 'vue'
import ImageGalleryInput from '@/components/molecules/ImageGalleryInput.vue'
import RelationSelect from '@/components/EldenRing/RelationSelect.vue'

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

const magicInputs = computed(() => {
  return Array.from({ length: 10 }).map((_, id) => ({
    name: `magic-${id + 1}`,
    type: 'magic',
    relationTo: ['er-sorceries', 'er-incantations'],
  }))
})

const statsSchema = props.stats.docs.reduce((acc, value) => {
  acc[`stat-${value.id}`] = z.number().min(1).max(99)
  return acc
}, {})

const formSchema = toTypedSchema(z.object({
  // Build informations
  name: z.string().min(2).max(255),
  is_two_handed: z.boolean().default(false).optional(),
  youtube_url: z.string().url({ message: "Invalid url" }).or(z.literal('')).optional(),
  archetypes: z.array(z.number()).optional(),
  restrictions: z.array(z.number()).optional(),
  class: z.number().min(0),
  level: z.number().min(1).max(713),
  'stat-1': z.number().min(1).max(99),
  'stat-2': z.number().min(1).max(99),
  'stat-3': z.number().min(1).max(99),
  'stat-4': z.number().min(1).max(99),
  'stat-5': z.number().min(1).max(99),
  'stat-6': z.number().min(1).max(99),
  'stat-7': z.number().min(1).max(99),
  'stat-8': z.number().min(1).max(99),
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
  'magic-1': z.string().optional(),
  'magic-2': z.string().optional(),
  'magic-3': z.string().optional(),
  'magic-4': z.string().optional(),
  'magic-5': z.string().optional(),
  'magic-6': z.string().optional(),
  'magic-7': z.string().optional(),
  'magic-8': z.string().optional(),
  'magic-9': z.string().optional(),
  'magic-10': z.string().optional(),
}))

const { handleSubmit, values, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    archetypes: [1], // Melee is default
    class: 7, // Wretch class is default
    level: 1, // Wretch class is default
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
const editorState = ref()
const imagesForm = ref()

/**
 * Get formatted values from the form `values`
 */

const mainhands = computed(() => {
  return [values['mainhand-1'], values['mainhand-2'], values['mainhand-3']].filter(Boolean).map((item, index) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id,
      ashId: values[`mainhand-ash-${index + 1}`]?.split(':')[1],
      affinityId: values[`mainhand-affinity-${index + 1}`]?.split(':')[1],
    }
  })
})

const offhands = computed(() => {
  return [values['offhand-1'], values['offhand-2'], values['offhand-3']].filter(Boolean).map((item, index) => {
    const [collectionSlug, id] = item.split(':')
    return {
      collectionSlug,
      name: collectionSlug.split('er-')[1],
      id,
      ashId: values[`offhand-ash-${index + 1}`]?.split(':')[1],
      affinityId: values[`offhand-affinity-${index + 1}`]?.split(':')[1],
    }
  })
})

const armors = computed(() => {
  const armorIds = [values.helm, values.chest, values.gauntlet, values.leg].filter(Boolean).map((armor) => Number(armor.split(':')[1]))
  return armorIds
})

const talismans = computed(() => {
  return [values['talisman-1'], values['talisman-2'], values['talisman-3'], values['talisman-4']].filter(Boolean).map((talisman) => Number(talisman.split(':')[1]))
})

const magics = computed(() => {
  return [
    values['magic-1'],
    values['magic-2'],
    values['magic-3'],
    values['magic-4'],
    values['magic-5'],
    values['magic-6'],
    values['magic-7'],
    values['magic-8'],
    values['magic-9'],
    values['magic-10'],
  ]
})

const sorceries = computed(() => {
  return magics.value
    .filter(Boolean)
    .filter((id) => id.startsWith('er-sorceries'))
    .map((id) => Number(id.split(':')[1]))
})

const incantations = computed(() => {
  return magics.value
    .filter(Boolean)
    .filter((id) => id.startsWith('er-incantations'))
    .map((id) => Number(id.split(':')[1]))
})

const statistics = computed(() => {
  return props.stats.docs.map((stat) => {
    const value = values[`stat-${stat.id}`]

    return {
      stat: stat.id,
      value
    }
  })
})

/**
 * Events
 */

function onEditorChange(state) {
  editorState.value = state
}

/**
 * Keep track of the images form
 */
async function onGalleryChange(form) {
  imagesForm.value = form
}

/**
 * Update the rune level and statistics
 * TODO: update equipment
 */
function onClassChange(newClass: ErClass) {
  toast(`Do you want to replace the stats by the one used in the starting class?`, {
    action: {
      label: 'Replace',
      onClick: () => {
        const newValues = {
          level: newClass.rune_level
        }

        newClass.statistics.forEach((stat) => {
          newValues[`stat-${stat.stat?.id}`] = stat.value
        })

        setValues(newValues)
      }
    },
  })
}

/**
 * Create a new build
 */
const onSubmit = handleSubmit(async (values) => {
  // Upload images first to reference them after

  const uploadPromises = []

  for (const file of new FormData(unref(imagesForm)).values()) {
    const body = new FormData()
    body.append('file', file)

    uploadPromises.push(
      fetch(`/api/er-media`, {
        method: 'POST',
        credentials: 'include',
        body,
      }).then((res) => res.json())
    )
  }

  toast.info('Uploading images...')
  const images: PayloadMediaResponse[] = await Promise.all(uploadPromises)

  /**
   * Request body
   * Will be sent to PayloadCMS
   */
  const build: Partial<ErBuild> = {
    name: values.name,
    // @ts-ignore
    description: JSON.stringify(editorState.value),
    is_two_handed: values.is_two_handed,
    youtube_url: values.youtube_url,
    images: images.map((image) => ({
      image: image.doc.id
    })),
    starting_class: values.class,
    archetype: values.archetypes,
    restrictions: values.restrictions,
    mainhand_weapons: mainhands.value.map((item) => ({
      weapon: Number(item.id),
      ash_of_war: Number(item.ashId),
      affinity: Number(item.affinityId)
    })),
    offhand_weapons: offhands.value.map((item) => ({
      [item.name]: Number(item.id),
      ash_of_war: Number(item.ashId),
      affinity: Number(item.affinityId)
    })),
    armors: armors.value,
    talismans: talismans.value,
    sorceries: sorceries.value,
    incantations: incantations.value,
    level: values.level,
    statistics: statistics.value,
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
        }, 1000);
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
  <section class="mt-4">
    <!-- Build informations -->
    <div class="grid md:grid-cols-2 gap-4">
      <div>
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

        <Editor @change="onEditorChange" />
      </div>

      <div class="flex flex-col gap-y-4">
        <div class="flex flex-col md:flex-row md:items-start gap-2 mt-2 md:mt-0">
          <Tags
            label="archetypes"
            name="archetypes"
            :docs="archetypes" />
          <Tags
            label="restrictions"
            name="restrictions"
            :docs="restrictions" />
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

        <ImageGalleryInput class="flex-1" @change="onGalleryChange" />
      </div>
    </div>
    <!-- Equipment -->
    <div class="grid md:grid-cols-12 border-t mt-4 pt-4">
      <!-- Mainhand, offhand, armor, talismans... -->
      <div class="md:col-span-6">
        <div class="grid grid-cols-er-builder" v-for="row in FORM">
          <div v-for="input in row" class="relative">
            <RelationSearch
              :key="input.name"
              v-bind="input"
              :values="values"
              :set-values="setValues" />

              <RelationSearch
                v-if="input.type === 'mainhand' || input.type === 'offhand'"
                :key="`${input.name.split('-')[0]}-ash-${input.name.split('-')[1]}`"
                :name="`${input.name.split('-')[0]}-ash-${input.name.split('-')[1]}`"
                type="ash"
                :relation-to="['er-ashes-of-war']"
                :values="values"
                :set-values="setValues" />

              <RelationSearch
                v-if="input.type === 'mainhand' || input.type === 'offhand'"
                :key="`${input.name.split('-')[0]}-affinity-${input.name.split('-')[1]}`"
                :name="`${input.name.split('-')[0]}-affinity-${input.name.split('-')[1]}`"
                type="affinity"
                :relation-to="['er-affinities']"
                :values="values"
                :set-values="setValues" />
          </div>
        </div>
        <div class="grid grid-cols-er-builder">
          <div v-for="input in magicInputs" class="relative">
            <RelationSearch
              :key="input.name"
              v-bind="input"
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

        <RelationSelect
          @change="onClassChange"
          class="flex flex-row items-center gap-x-8"
          name="class"
          label="Starting Class"
          placeholder="- Select a class -"
          relation-to="er-classes" />

        <Statistics :stats="stats.docs" />
      </div>
    </div>

    <div class="flex justify-center my-12">
      <button @click="onSubmit" class="button" type="button">
        Create
      </button>
    </div>
  </section>
</template>