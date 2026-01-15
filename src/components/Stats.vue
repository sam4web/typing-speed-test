<script setup lang="ts"></script>

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
          <button class="btn variant-select">Easy</button>
          <button class="btn variant-select">Medium</button>
          <button class="btn variant-select active">Hard</button>
        </div>
      </div>
      <div class="divider h-8" />
      <div class="space-x-3.5 flex-center">
        <p class="text-base text-neutral-400">Mode:</p>
        <div class="space-x-1.5 flex-center">
          <button class="btn variant-select">Timed (60s)</button>
          <button class="btn variant-select">Passage</button>
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
