<script setup lang="ts">
  import qs from 'qs'
  import { computed, reactive, ref } from 'vue';
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
import type { PayloadMedia } from '@/types';

  const SELECT_IMAGES = {
    'mainhand': '/elden-ring/builder/mainhand.png',
    'offhand': '/elden-ring/builder/offhand.png',
    'bolt': '/elden-ring/builder/arrows.png',
    'greatbolt': '/elden-ring/builder/bolts.png',
    'helm': '/elden-ring/builder/helmet.png',
    'chest': '/elden-ring/builder/chest.png',
    'gauntlet': '/elden-ring/builder/gauntlet.png',
    'leg': '/elden-ring/builder/leg.png',
    'talisman': '/elden-ring/builder/talismans.png',
    'ash': '/elden-ring/builder/ash.png',
    'magic': '/elden-ring/builder/sorceries.png'
  }

  const props = defineProps<{
    values: any;
    setValues: any;
    name: string;
    type: string;
    relationTo: any;
  }>()

  interface IPayloadOptionLike {
    id: number | string;
    name: string;
    image?: PayloadMedia | null
  }

  const value = ref(null)
  const searchTerm = ref('')
  const isOpen = ref(false)
  const loading = ref(false)
  const hasFetchedAllPages = ref(false)
  const optionsByRelations = reactive<{
    [key: string]: IPayloadOptionLike[]
  }>({})
  const optionsGroups = computed(() => Object.entries(optionsByRelations).map(([relation, options]) => ([relation, options.filter((item) => item.name.includes(searchTerm.value)).splice(0, 50)])))
  const isSmall = computed(() => props.type === 'ash' || props.type === 'affinity')

  const previewImage = computed(() => {
    if (value.value?.image?.thumbnailURL) {
      return value.value?.image?.thumbnailURL
    }

    return 'https://cdn.soulsborne.build/test%2Fmainhand.png'
  })

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
    if (hasFetchedAllPages.value) return console.log('skipped')

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
            <img
              class="transition-opacity ease-in z-[1]"
              :class="{
                'size-32': !isSmall,
                'size-16': isSmall,
              }"
              height="128"
              width="128"
              src="/elden-ring/builder/select-background.png"
              alt="" />
              <!-- Placeholder -->
            <img
              v-if="SELECT_IMAGES[type]"
              class="absolute top-0 transform scale-75 p-1 object-contain transition-opacity ease-in z-[2]"
              :class="{
                'size-32': !isSmall,
                'size-16': isSmall,
                'opacity-50': loading || values[name]
              }"
              height="128"
              width="128"
              :src="SELECT_IMAGES[type]"
              alt="" />
            <!-- Item's image here -->
            <div v-if="values[name]" class="absolute inset-0 z-[2]">
              <img class="p-4" :src="previewImage" />
            </div>
            <img
              class="absolute top-0 transition-opacity ease-in z-[3]"
              :class="{
                'size-32': !isSmall,
                'size-16': isSmall,
                'opacity-0': !false,
                'opacity-50': false
              }"
              height="128"
              width="128"
              src="/elden-ring/builder/select-active.png"
              alt="" />
            <div
              class="loader absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-opacity ease-in z-[2]"
              :class="{
                'opacity-0': !loading
              }">
            </div>
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
                :heading="relation">
                <template
                  v-for="(option, index) in (options as IPayloadOptionLike[])"
                  :key="`${relation}:${option.id}`">
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
                      class="size-8 mr-2"
                      small
                      :src="option?.image?.thumbnailURL ?? 'https://cdn.soulsborne.build/test%2Fmainhand.png'" />
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