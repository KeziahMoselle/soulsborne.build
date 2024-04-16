<script setup lang="ts">
import type { PayloadCollection, PayloadOptionLike } from '@/types'
import qs from 'qs'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import { inMemoryCache } from '@/lib/Cache'
import { apiFetch } from '@/api'
import { FormField } from '@/components/ui/form'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormLabel from '@/components/ui/form/FormLabel.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'

const emit = defineEmits(['change'])

const props = defineProps<{
  name: string
  label: string
  placeholder: string
  relationTo: string
}>()

const retriesLeft = ref(5)
const value = ref(null)
const item = ref(null)
const options = ref<PayloadOptionLike[]>([])

async function getOptions({ relation, query = {} }) {
  const stringifiedQuery = qs.stringify(
    {
      where: query,
      sort: 'name',
      limit: 100,
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
}

async function getAllOptions() {
  const response: PayloadCollection<PayloadOptionLike> = await getOptions({
    relation: props.relationTo,
  })

  if (response) {
    options.value = response.docs
  } else if (retriesLeft.value > 0) {
    retriesLeft.value = retriesLeft.value - 1
    getAllOptions()
  } else {
    toast.error(
      `There has been an error fetching data for "${props.label}". Please reload your page.`,
    )
  }
}

function onChange(id) {
  const newItem = options.value.find(option => option.id === id)
  item.value = newItem
  emit('change', newItem)
}

onMounted(getAllOptions)
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem v-bind="$attrs">
      <FormLabel>{{ label }}</FormLabel>

      <Select
        @update:modelValue="onChange"
        v-model="value"
        v-bind="componentField"
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="placeholder" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="option in options" :value="option.id">
              {{ option.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
