<script setup lang="ts">
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import type { ErStatistic } from '@payload-types';

defineProps<{
  stats: ErStatistic[];
}>()
</script>

<template>
  <div>
    <FormField
      v-slot="{ componentField, errors }"
      name="level">
      <FormItem class="flex items-center justify-between gap-4">
        <FormLabel class="flex flex-col">
          <span :class="{
            'text-destructive': errors.length
          }">Rune Level</span>
        </FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            placeholder="10"
            min="1"
            max="713"
            class="w-20" />
        </FormControl>
      </FormItem>
      <FormMessage />
    </FormField>
    <FormField
      v-for="stat in stats"
      v-slot="{ componentField, value, errors }"
      :name="`stat-${stat.id}`">
      <FormItem class="flex items-center justify-between gap-4">
        <FormLabel class="flex flex-col">
          <span :class="{
            'text-destructive': errors.length
          }">{{ stat.name }}</span>
          <span class="text-xs text-slate-400" v-if="stat.softcaps.find((cap) => cap.level > Number(value || 0))">
            Next cap: {{ stat.softcaps.find((cap) => cap.level > Number(value || 0)).level }}
          </span>
        </FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            placeholder="10"
            min="1"
            max="99"
            class="w-20" />
        </FormControl>
      </FormItem>
      <FormMessage />
    </FormField>
  </div>
</template>