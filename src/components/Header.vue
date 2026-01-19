<script setup lang="ts">
  import { useTypingTestStore } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';

  const store = useTypingTestStore();
  const { personalBest } = storeToRefs(store);
</script>

<template>
  <header class="w-full flex-between">
    <img
      src="@/assets/images/logo-small.svg"
      alt="logo image"
      class="inline-block sm:hidden select-none"
    />
    <img
      src="@/assets/images/logo-large.svg"
      alt="logo image"
      class="sm:inline-block hidden select-none"
    />

    <div class="flex-center space-x-2.5">
      <img
        src="@/assets/images/icon-personal-best.svg"
        alt="personal-best-icon"
      />
      <p class="text-neutral-400 text-lg font-normal">
        <span class="hidden sm:inline">Personal best:</span>
        <span class="inline sm:hidden">Best:</span>{{ ' ' }}
        <span class="text-neutral-0">{{ personalBest }} WPM</span>
      </p>
    </div>
  </header>
</template>
