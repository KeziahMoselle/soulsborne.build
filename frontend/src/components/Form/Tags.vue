<script setup lang="ts">
import type { PayloadCollection } from '@/types'
import { computed, ref } from 'vue'
import {
  ComboboxAnchor,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue'
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { onClickOutside } from '@vueuse/core'
import { useFieldArray } from 'vee-validate'

const props = defineProps<{
  label: string
  name: string
  docs: PayloadCollection<Partial<{ id: number; name: string }>>
}>()

const input = ref(null)
const { remove, push, fields } = useFieldArray(props.name)
const open = ref(false)
const searchTerm = ref('')
const fieldsValues = computed(() => fields.value.map(field => field.value))
const filteredTags = computed(() =>
  props.docs.docs
    .filter(i => !fieldsValues.value.includes(i.id))
    .map(i => ({
      label: i.name,
      value: i.id,
    })),
)

onClickOutside(input, () => (open.value = false))

function onSelect(ev) {
  push(ev.detail.value)
  searchTerm.value = ''
  open.value = false
}
</script>

<template>
  <TagsInput ref="input" class="px-0 gap-0 w-full md:w-80" @click="open = true">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem
        v-for="(field, idx) in fields"
        :key="field.key"
        :value="docs.docs.find(doc => doc.id === field.value).name"
      >
        <TagsInputItemText />
        <TagsInputItemDelete @click="remove(idx)" />
      </TagsInputItem>
    </div>

    <ComboboxRoot v-model:open="open" class="w-full">
      <ComboboxAnchor as-child>
        <ComboboxInput :placeholder="`- Select ${label} -`" as-child>
          <TagsInputInput
            class="w-full px-3"
            :class="fields.length > 0 ? 'mt-2' : ''"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty />
          <CommandGroup>
            <CommandItem
              v-for="tag in filteredTags"
              :key="tag.value"
              :value="tag.value"
              @select.prevent="onSelect"
            >
              {{ tag.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
