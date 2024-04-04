<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import RelationSelect from '@/components/EldenRing/RelationSelect.vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FORM = [
  [
    {
      name: 'mainhand-1',
      type: 'mainhand',
      relations: ['er-weapons'],
    },
    {
      name: 'mainhand-2',
      type: 'mainhand',
      relations: ['er-weapons'],
    },
    {
      name: 'mainhand-3',
      type: 'mainhand',
      relations: ['er-weapons'],
    },
    {
      name: 'bolt-1',
      type: 'bolt',
      relations: ['er-ammunitions'],
      filter: (item) => item.ammunition_type === 'Bolt'
    },
    {
      name: 'bolt-2',
      type: 'bolt',
      relations: ['er-ammunitions'],
      filter: (item) => item.ammunition_type === 'Bolt'
    },
  ],
  [
    {
      name: 'offhand-1',
      type: 'offhand',
      relations: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-2',
      type: 'offhand',
      relations: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-3',
      type: 'offhand',
      relations: ['er-weapons', 'er-shields'],
    },
    {
      name: 'greatbolt-1',
      type: 'greatbolt',
      relations: ['er-ammunitions'],
      filter: (item) => item.ammunition_type === 'Greatbolt'
    },
    {
      name: 'greatbolt-2',
      type: 'greatbolt',
      relations: ['er-ammunitions'],
      filter: (item) => item.ammunition_type === 'Greatbolt'
    },
  ],
  [
    {
      name: 'helm',
      type: 'helm',
      relations: ['er-armors'],
      filter: (armor) => armor.armor_type === 'Helm'
    },
    {
      name: 'chest',
      type: 'chest',
      relations: ['er-armors'],
      filter: (armor) => armor.armor_type === 'Chest'
    },
    {
      name: 'gauntlet',
      type: 'gauntlet',
      relations: ['er-armors'],
      filter: (armor) => armor.armor_type === 'Gauntlet'
    },
    {
      name: 'leg',
      type: 'leg',
      relations: ['er-armors'],
      filter: (armor) => armor.armor_type === 'Leg'
    },
  ],
  [
    {
      name: 'talisman-1',
      type: 'talisman',
      relations: ['er-talismans'],
    },
    {
      name: 'talisman-2',
      type: 'talisman',
      relations: ['er-talismans'],
    },
    {
      name: 'talisman-3',
      type: 'talisman',
      relations: ['er-talismans'],
    },
    {
      name: 'talisman-4',
      type: 'talisman',
      relations: ['er-talismans'],
    },
  ],
]

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(255),
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

    <!-- Equipment -->
    <div class="grid grid-cols-5" v-for="row in FORM">
      <div v-for="input in row">
        <RelationSelect v-bind="input" />
      </div>
    </div>

    <button type="submit">
      Create
    </button>
  </form>
</template>