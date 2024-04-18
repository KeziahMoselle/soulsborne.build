<script setup lang="ts">
import Tag from '@/components/molecules/EldenRing/Tag.vue';
import { Heart } from 'lucide-vue-next';

</script>

<template>
  <article class="group/fashion relative z-10 w-[217px] h-[330px] flex items-end pl-[10px] pr-[14px] pb-[14px]">
    <img class="absolute inset-0 -z-10 w-full h-full object-cover object-center" src="/fashion-card.jpg" alt="Fashion example" />

    <footer class="w-full">
      <div class="">
        <h3 class="type-h4 italic pb-1 border-b border-accent-foreground">
          Red Warrior
        </h3>

        <h4 class="type-h5 mt-1">
          Keziah
        </h4>
      </div>

      <div class="flex justify-end gap-x-2">
        <Tag label="150" />
        <Heart class="text-accent-foreground hover:fill-accent-foreground" />
      </div>
    </footer>
  </article>
</template>