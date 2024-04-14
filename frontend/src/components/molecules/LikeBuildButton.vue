<script setup lang="ts">
  import type { ErBuild } from '@payload-types';
  import { ThumbsUpIcon } from 'lucide-vue-next'
  import { toggleVoteBuild } from '@/api';
  import { toast } from 'vue-sonner';
  import { ref } from 'vue';

  const props = defineProps<{
    build?: ErBuild,
    hasVoted?: boolean
  }>()

  const hasVoted = ref(props.hasVoted)
  const votesCount = ref(props.build.votes_count)

  async function toggleVote() {
    const update = toggleVoteBuild({ buildId: props.build.id })
    toast.promise(update, {
      success: (updatedBuild) => {
        votesCount.value = updatedBuild.votes_count
        hasVoted.value = !hasVoted.value
        return `Successfully ${hasVoted.value ? 'voted' : 'removed vote'}.`
      },
      error: (e) => 'There was an error.'
    })
  }
</script>

<template>
  <button
    type="button"
    class="flex items-center self-center gap-x-2 leading-4 px-2 py-1 rounded transition lg:text-sm lg:px-3 hover:bg-accent z-20"
    :class="{
      'bg-accent-foreground': !hasVoted,
      'bg-accent': hasVoted
    }"
    :title="hasVoted ? 'Unvote' : 'Vote'"
    @click="toggleVote">
    <span class="type-h5">{{ votesCount }}</span>
    <ThumbsUpIcon class="w-3" />
  </button>
</template>