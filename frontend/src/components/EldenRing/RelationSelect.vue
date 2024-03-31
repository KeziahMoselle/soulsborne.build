<script setup lang="ts">
  import { onMounted, ref } from 'vue';
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
    relations: string[];
    filter?: (item: any) => boolean;
  }>()

  const loading = ref(true)
  const optionsGroups = ref([])

  onMounted(() => {
    loading.value = false;
  })

  async function getOptions(relation) {
    const cached = inMemoryCache.get(relation)

    if (cached) {
      return cached
    }

    const response = await apiFetch(`/api/${relation}`)
    inMemoryCache.set(relation, response)
    return response
  }

  /**
   * Get all options from all loaded relations
   * if optionsGroups already contains data do nothing
   */
  async function getAllOptions() {
    if (optionsGroups.value.length > 0) return;

    for (const relation of props.relations) {
      const options = await getOptions(relation)
      optionsGroups.value.push({
        relation,
        docs: options.docs
      })
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