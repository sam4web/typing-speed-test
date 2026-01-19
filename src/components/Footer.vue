<script setup lang="ts">
  import { useTypingTestStore } from '@/stores/typingTest';
  const { restartTest } = useTypingTestStore();
</script>

<template>
  <footer class="pt-8 border-t border-neutral-700 flex-center">
    <button
      @click="restartTest"
      class="flex-center btn variant-secondary-dark gap-2.5"
    >
      Restart Test
      <img
        class="size-5"
        src="@/assets/images/icon-restart-dark.svg"
        alt="restart icon"
      />
    </button>
  </footer>
</template>
