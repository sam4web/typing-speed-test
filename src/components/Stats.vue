<script setup lang="ts">
  import { useTypingTestStore, type IOptions } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';

  const store = useTypingTestStore();
  const { options, started } = storeToRefs(store);

  const difficultyOptions: { title: string; value: IOptions['difficulty'] }[] = [
    { title: 'Easy', value: 'easy' },
    { title: 'Medium', value: 'medium' },
    { title: 'Hard', value: 'hard' },
  ] as const;

  const modeOptions: { title: string; value: IOptions['mode'] }[] = [
    { title: 'Timed (60s)', value: 'timed' },
    { title: 'Passage', value: 'passage' },
  ] as const;

  function setDifficultyOption(option: IOptions['difficulty']) {
    if (started.value) return;
    options.value.difficulty = option;
  }

  function setModeOption(option: IOptions['mode']) {
    if (started.value) return;
    options.value.mode = option;
  }
</script>

<template>
  <div class="flex-between border-b border-neutral-700 pb-4">
    <div class="flex-center space-x-6">
      <div class="flex-center space-x-3">
        <p class="text-neutral-400 text-xl">WPM:</p>
        <b class="text-neutral-0 text-2xl font-bold">0</b>
      </div>
      <div class="divider h-6" />
      <div class="flex-center space-x-3">
        <p class="text-neutral-400 text-xl">Accuracy:</p>
        <b class="text-neutral-0 text-2xl font-bold">100%</b>
      </div>
      <div class="divider h-6" />
      <div class="flex-center space-x-3">
        <p class="text-neutral-400 text-xl">Time:</p>
        <b class="text-neutral-0 text-2xl font-bold">0:60</b>
      </div>
    </div>

    <div class="flex-center space-x-4">
      <div class="space-x-3.5 flex-center">
        <p class="text-base text-neutral-400">Difficulty:</p>
        <div class="space-x-1.5 flex-center">
          <button
            v-for="option in difficultyOptions"
            @click="setDifficultyOption(option.value)"
            class="btn variant-select"
            :class="{ active: options.difficulty === option.value }"
            :disabled="started"
          >
            {{ option.title }}
          </button>
        </div>
      </div>
      <div class="divider h-8" />
      <div class="space-x-3.5 flex-center">
        <p class="text-base text-neutral-400">Mode:</p>
        <div class="space-x-1.5 flex-center">
          <button
            v-for="option in modeOptions"
            @click="setModeOption(option.value)"
            class="btn variant-select"
            :class="{ active: options.mode === option.value }"
            :disabled="started"
          >
            {{ option.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @reference "@/style.css";
  .divider {
    @apply bg-neutral-700 w-px rounded-xs;
  }
</style>
