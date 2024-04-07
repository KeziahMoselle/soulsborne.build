<script setup lang="ts">
  import qs from 'qs'
  import { computed, ref } from 'vue';
  import { inMemoryCache } from '@/lib/Cache'
  import { apiFetch } from '@/api';
  import { Check } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
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
  }

  const isOpen = ref(false)
  const loading = ref(false)
  const optionsByRelations = ref<{
    [key: string]: IPayloadOptionLike[]
  }>({})
  const isSmall = computed(() => props.type === 'ash' || props.type === 'affinity')

  async function getOptions(relation, query = {}) {
    const stringifiedQuery = qs.stringify(
      {
        where: query,
        sort: 'name',
        limit: 20,
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
    loading.value = true

    for (const relation of props.relationTo) {
      if (typeof relation === 'string') {
        const options = await getOptions(relation)
        optionsByRelations.value[relation] = options.docs
      }

      if (typeof relation === 'object') {
        const options = await getOptions(relation.slug, relation.query)
        optionsByRelations.value[relation.slug] = options.docs
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
                'opacity-50': loading
              }"
              height="128"
              width="128"
              :src="SELECT_IMAGES[type]"
              alt="" />
            <!-- Item's image here -->
            <p v-if="values[name]" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-[2]">todo image</p>
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
          <Command>
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
              <CommandGroup v-for="[relation, options] in Object.entries(optionsByRelations)">
                <CommandItem
                  v-for="option in options"
                  :key="option.id"
                  :value="`${relation}:${option.id}`"
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
                  <Check
                    :class="cn('mr-2 h-4 w-4', `${relation}:${option.id}` === values[name] ? 'opacity-100' : 'opacity-0')"
                  />
                  <span v-if="type !== 'ash'">
                    {{ option.name }}
                  </span>
                  <span v-if="type === 'ash'">
                    {{ option.name.split('Ash Of War:')[1] }}
                  </span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormItem>
  </FormField>
</template>