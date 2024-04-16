<script setup lang="ts">
import type { ErBuild, ErClass } from '@payload-types'
import { FORM } from '@/utils/eldenring'
import EquipmentImage from '@/components/molecules/EldenRing/EquipmentImage.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'

defineProps<{
  build: ErBuild
}>()

const ARMOR_TYPES = ['helm', 'chest', 'gauntlet', 'leg']
</script>

<template>
  <div class="container--xl grid md:grid-cols-12">
    <!-- Mainhand, offhand, armor, talismans... -->
    <div class="md:col-span-6">
      <div class="grid grid-cols-er-builder" v-for="row in FORM">
        <div v-for="(input, index) in row" class="relative">
          <template v-if="input.type === 'mainhand'">
            <EquipmentImage
              :equipment="build.mainhand_weapons?.[index]?.weapon"
              :type="input.type"
              size="l"
            />

            <div class="flex gap-x-1">
              <EquipmentImage
                :equipment="build.mainhand_weapons?.[index]?.affinity"
                type="affinity"
                size="m"
              />
              <EquipmentImage
                :equipment="build.mainhand_weapons?.[index]?.ash_of_war"
                type="ash"
                size="m"
                :class="{
                  'absolute bottom-0 right-0': input.type === 'ash',
                }"
              />
            </div>
          </template>

          <template v-if="input.type === 'offhand'">
            <EquipmentImage
              :equipment="build.offhand_weapons?.[index]?.weapon"
              :type="input.type"
              size="l"
            />

            <div class="flex gap-x-1">
              <EquipmentImage
                :equipment="build.offhand_weapons?.[index]?.affinity"
                type="affinity"
                size="m"
              />
              <EquipmentImage
                :equipment="build.offhand_weapons?.[index]?.ash_of_war"
                type="ash"
                size="m"
                :class="{
                  'absolute bottom-0 right-0': input.type === 'ash',
                }"
              />
            </div>
          </template>

          <template v-if="input.type === 'bolt'">
            <EquipmentImage
              :equipment="build.bolts[index]"
              :type="input.type"
              size="l"
            />
          </template>

          <template v-if="input.type === 'greatbolt'">
            <EquipmentImage
              :equipment="build.bolts[index]"
              :type="input.type"
              size="l"
            />
          </template>

          <template v-if="ARMOR_TYPES.includes(input.type)">
            <EquipmentImage
              :equipment="build.armors[index]"
              :type="input.type"
              size="l"
            />
          </template>

          <template v-if="input.type === 'talisman'">
            <EquipmentImage
              :equipment="build.talismans[index]"
              :type="input.type"
              size="l"
            />
          </template>
        </div>
      </div>
      <div class="grid grid-cols-er-builder">
        <div v-for="sorcery in build.sorceries" class="relative">
          <EquipmentImage :equipment="sorcery" type="magic" size="l" />
        </div>
        <div v-for="incantation in build.incantations" class="relative">
          <EquipmentImage :equipment="incantation" type="magic" size="l" />
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="md:col-start-11 md:col-span-2 mt-4">
      <div class="flex items-center justify-between gap-4">
        <span>Two handed</span>
        <span class="inline-block w-20">
          <Checkbox :checked="build.is_two_handed" disabled />
        </span>
      </div>

      <p>{{ (build.starting_class as ErClass)?.name }}</p>

      <div class="flex items-center justify-between gap-4">
        <span>Rune Level</span>
        <span class="inline-block w-20">
          {{ build.level }}
        </span>
      </div>

      <div
        v-for="{ stat, value } in build.statistics"
        class="flex items-center justify-between gap-4"
      >
        <span>{{ stat?.name }}</span>
        <span class="inline-block w-20">
          {{ value }}
        </span>
      </div>
    </div>
  </div>
</template>
