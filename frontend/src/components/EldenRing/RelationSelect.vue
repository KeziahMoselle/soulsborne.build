<script setup lang="ts">
  import qs from 'qs'
  import { ref } from 'vue';
  import { inMemoryCache } from '@/lib/Cache'
  import { apiFetch } from '@/api';

  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'

  const props = defineProps<{
    name: string;
    type: string;
    relationTo: any;
  }>()

  const loading = ref(false)
  const optionsGroups = ref([])

  async function getOptions(relation, query = {}) {
    const cached = inMemoryCache.get(relation)

    if (cached) {
      return cached
    }

    const stringifiedQuery = qs.stringify({
        where: query,
      },
      { addQueryPrefix: true },
    )
    const url = `/api/${relation}${stringifiedQuery}`
    const response = await apiFetch(url)
    inMemoryCache.set(url, response)
    return response
  }

  /**
   * Get all options from all loaded relations
   * if optionsGroups already contains data do nothing
   */
  async function getAllOptions() {
    if (optionsGroups.value.length > 0) return;

    loading.value = true;

    for (const relation of props.relationTo) {
      if (typeof relation === 'string') {
        const options = await getOptions(relation)
        optionsGroups.value.push({
          relation,
          docs: options.docs
        })
      }

      if (typeof relation === 'object') {
        const options = await getOptions(relation.slug, relation.query)
        optionsGroups.value.push({
          relation: relation.slug,
          docs: options.docs
        })
      }
    }
  }
</script>

<template>
  <FormField :name="name" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>{{ name }}</FormLabel>

      <Select v-bind="componentField" @update:open="getAllOptions">
        <img class="size-32" height="128" width="128" src="/elden-ring/builder/select-background.png" alt="" />

        <FormControl>
          <SelectTrigger>
            <SelectValue
              :placeholder="loading ? 'Loading...' : '- Select -'" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup v-for="group in optionsGroups">
            <SelectLabel>{{ group.relation }}</SelectLabel>
            <SelectItem v-for="option in group.docs" :value="`${group.relation}:${option.id}`">
              {{ option.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>