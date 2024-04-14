<script setup lang="ts">
  import type { PayloadOptionLike } from '@/types';
  import qs from 'qs'
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { inMemoryCache } from '@/lib/Cache'
  import { apiFetch } from '@/api';
  import {
    FormControl,
    FormField,
    FormItem,
  } from '@/components/ui/form'
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '@/components/ui/command'
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
  import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue';
  import { X } from 'lucide-vue-next';

  const props = defineProps<{
    values: any;
    setValues: any;
    name: string;
    type: string;
    relationTo: any;
  }>()

  const value = ref(null)
  const searchTerm = ref('')
  const isOpen = ref(false)
  const loading = ref(false)
  const hasFetchedAllPages = ref(false)
  const optionsByRelations = reactive<{
    [key: string]: PayloadOptionLike[]
  }>({})
  const optionsGroups = computed(() => Object.entries(optionsByRelations).map(([relation, options]) => ([relation, options.filter((item) => item.name.toLowerCase().includes(searchTerm.value.toLowerCase())).splice(0, 50)])))
  const previewEquipment = computed(() => {
    if (props.values[props.name]) {
      return unref(value)
    }

    return null
  })

  const LABELS = {
    archetypes: 'Archetypes',
    restrictions: 'Restrictions',
    'er-affinities': 'Affinities',
    'er-ammunitions': 'Arrows & Bolts',
    'er-armors': 'Armors',
    'er-ashes-of-war': 'Ashes of War',
    'er-builds': 'Builds',
    'er-classes': 'Classes',
    'er-media': 'Media',
    'er-incantations': 'Incantations',
    'er-incantation-types': 'Incantations Types',
    'er-shields': 'Shields',
    'er-skills': 'Skills',
    'er-sorceries': 'Sorceries',
    'er-sorcery-types': 'Sorcery Type',
    'er-statistics': 'Statistics',
    'er-status-effects': 'Status Effects',
    'er-talismans': 'Talismans',
    'er-weapon-types': 'Weapon Types',
    'er-weapons': 'Weapons'
  }

  async function getOptions({ relation, query = {}, page = 1 }) {
    const stringifiedQuery = qs.stringify(
      {
        where: query,
        sort: 'name',
        limit: 100,
        depth: 2,
        page
      },
      { addQueryPrefix: true },
    )
    const url = `/api/${relation}${stringifiedQuery}`

    const cached = inMemoryCache.get(url)

    if (cached) {
      return cached
    }

    const response = await apiFetch(url)
    inMemoryCache.set(url, response)
    return response
  }

  /**
   * Get all options from all loaded relations
   */
  async function getAllOptions() {
    if (hasFetchedAllPages.value) return

    loading.value = true

    let hasNextPage = false
    let page = 0

    for (const relation of props.relationTo) {
      if (typeof relation === 'string') {
        do {
          const options = await getOptions({
            relation,
            page,
          })
          if (Array.isArray(optionsByRelations[relation])) {
            optionsByRelations[relation] = [...optionsByRelations[relation], ...options.docs]
          } else {
            optionsByRelations[relation] = options.docs
          }
          page = options.nextPage
          hasNextPage = options.hasNextPage

          if (!hasNextPage) {
            hasFetchedAllPages.value = true
          }
        } while (hasNextPage)
      }

      if (typeof relation === 'object') {
        const options = await getOptions({
          relation: relation.slug,
          query: relation.query
        })
        optionsByRelations[relation.slug] = options.docs
      }
    }

    loading.value = false
  }
</script>

<template>
  <FormField :name="name">
    <FormItem
      :class="{
        'absolute bottom-0 right-0': type === 'ash'
      }">
      <Popover
        v-model:open="isOpen"
        @update:open="getAllOptions">
        <PopoverTrigger class="relative">
          <FormControl>
            <EquipmentImage
              :equipment="previewEquipment"
              :type="type"
              :size="['ash', 'affinity'].includes(type) ? 'm' : 'l'"
              :loading="loading"
              is-select
            />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-[200px] p-0">
          <Command v-model="value" v-model:searchTerm="searchTerm">
            <CommandInput placeholder="Search..." />
            <CommandEmpty>
              <span v-if="loading">
                Loading...
              </span>
              <span v-else>
                Nothing found.
              </span>
            </CommandEmpty>
            <CommandList>
              <CommandGroup
                v-for="[relation, options] in optionsGroups"
                :key="relation"
                :heading="LABELS[relation]">
                <template
                  v-for="(option, index) in (options as PayloadOptionLike[]).filter((option) => option.id !== previewEquipment?.id)"
                  :key="`${relation}:${option.id}`">
                  <CommandItem
                    v-if="previewEquipment && (index === 0)"
                    :value="value"
                    class="relative bg-primary"
                    @select="() => {
                      isOpen = false

                      setValues({
                        [name]: undefined,
                      })
                    }"
                  >
                    <EquipmentImage
                      class="mr-2"
                      size="xs"
                      :equipment="value"
                      :type="type"
                      is-select />
                    <span class="flex-1" v-if="type !== 'ash'">
                      {{ value.name }}
                    </span>
                    <span class="flex-1" v-if="type === 'ash'">
                      {{ value.name.split('Ash Of War:')[1] ?? value.name }}
                    </span>
                    <X class="absolute top-1/2 transform -translate-y-1/2 right-2" />
                  </CommandItem>
                  <CommandItem
                    :value="option"
                    :class="{
                      'bg-primary': `${relation}:${option.id}` === values[name]
                    }"
                    @select="() => {
                      isOpen = false

                      if (values[name] === `${relation}:${option.id}`) {
                        setValues({
                          [name]: undefined,
                        })
                        return
                      }

                      setValues({
                        [name]: `${relation}:${option.id}`,
                      })
                    }"
                  >
                    <EquipmentImage
                      class="mr-2"
                      size="xs"
                      :equipment="option"
                      :type="type"
                      is-select />
                    <span class="flex-1" v-if="type !== 'ash'">
                      {{ option.name }}
                    </span>
                    <span class="flex-1" v-if="type === 'ash'">
                      {{ option.name.split('Ash Of War:')[1] ?? option.name }}
                    </span>
                  </CommandItem>
                  <div class="relative flex flex-col select-none items-center rounded-sm px-2 py-1.5 text-sm opacity-50" v-if="index === (options.length - 1)" disabled>
                    <p class="m-0">{{ optionsByRelations[relation as string].length - options.length }} hidden results.</p>
                    <p class="m-0">Type to filter</p>
                  </div>
                </template>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  </FormField>
</template>