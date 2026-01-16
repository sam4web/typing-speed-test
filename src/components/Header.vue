<script setup lang="ts">
  import { useTypingTestStore } from '@/stores/typingTest';

  const { personalBest } = useTypingTestStore();
</script>

<template>
  <header class="w-full flex-between">
    <img
      src="@/assets/images/logo-large.svg"
      alt="logo image"
      class="select-none"
    />

    <div class="flex-center space-x-2.5">
      <img
        src="@/assets/images/icon-personal-best.svg"
        alt="personal-best-icon"
      />
      <p class="text-neutral-400 text-lg font-normal">
        Personal best: <span class="text-neutral-0">{{ personalBest }} WPM</span>
      </p>
    </div>
  </header>
</template>
