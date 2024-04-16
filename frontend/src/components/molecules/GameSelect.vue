<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu class="self-stretch border-r *:h-full">
    <NavigationMenuList class="h-full">
      <NavigationMenuItem class="h-full flex items-center">
        <NavigationMenuTrigger class="h-full">
          <a class="flex items-center justify-between self-stretch" href="/">
            <picture>
              <source
                media="(max-width: 767px)"
                srcset="/img/eldenring-icon.png"
              />
              <source
                media="(min-width: 768px)"
                srcset="/img/eldenring-logo.png"
              />
              <img
                class="h-10 py-2 md:h-8 md:w-auto md:py-0"
                src="/img/eldenring-logo.png"
                alt="Current dataset is Elden Ring"
              />
            </picture>
          </a>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="flex flex-col gap-y-2 px-5 py-2 w-[93px] md:w-[216px]">
            <li
              class="opacity-70 cursor-not-allowed flex items-center justify-center"
              title="Coming in v2"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcset="/img/darksouls-icon.png"
                />
                <source
                  media="(min-width: 768px)"
                  srcset="/img/darksouls-logo.png"
                />
                <img
                  class="filter grayscale h-16 py-2 md:h-8 md:w-auto md:py-0"
                  src="/img/darksouls-logo.png"
                  alt="Switch to Dark Souls dataset"
                />
              </picture>
            </li>
            <li
              class="opacity-70 cursor-not-allowed flex items-center justify-center"
              title="Coming in v3"
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcset="/img/bloodborne-icon.png"
                />
                <source
                  media="(min-width: 768px)"
                  srcset="/img/bloodborne-logo.png"
                />
                <img
                  class="filter grayscale h-16 py-2 md:h-8 md:w-auto md:py-0"
                  src="/img/bloodborne-logo.png"
                  alt="Switch to Bloodborne dataset"
                />
              </picture>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
