<script setup lang="ts">
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';

onMounted(() => {
  const url = new URL(window.location.href)
  if (url.searchParams.has('unauthorized')) {
    toast.warning('Only beta testers accounts can access this page. Join the Discord if you want to become a beta tester!')
  }
})
</script>