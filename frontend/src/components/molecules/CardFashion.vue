<script setup lang="ts">
import Tag from '@/components/molecules/EldenRing/Tag.vue';
import { Heart } from 'lucide-vue-next';
</script>

<template>
  <article class="group/fashion relative z-10 border border-accent w-full h-[330px] flex items-end pl-[10px] pr-[14px] pb-[14px] drop-shadow-sm">
    <div class="absolute inset-0 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out after:absolute after:inset-0 after:bg-gradient-to-b after:from-gradient-one after:from-0% after:via-gradient-two after:via-70% after:to-gradient-three after:to-100% group-hover/fashion:after:opacity-100">
      <img
        class="w-full h-full object-cover object-center"
        src="/fashion-card.jpg"
        alt="Fashion example" />
    </div>

    <footer class="w-full pointer-events-none opacity-0 transition-opacity ease-out duration-300 group-hover/fashion:opacity-100 group-hover/fashion:pointer-events-auto z-10">
      <div>
        <a :href="`/fashion/1`" title="See fashion" class="after:absolute after:inset-0">
          <h3 class="type-h4 italic pb-1 border-b border-accent-foreground">
            Red Warrior
          </h3>
        </a>

        <h4 class="type-h5 mt-1">
          Keziah
        </h4>
      </div>

      <div class="flex justify-end gap-x-2">
        <Tag label="150" />
        <Heart class="pointer-events-auto z-10 text-accent-foreground hover:fill-accent-foreground" />
      </div>
    </footer>
  </article>
</template>