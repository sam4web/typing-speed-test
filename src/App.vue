<script setup lang="ts">
  import { Footer, Header, Stats, TypingArea, TypingResults } from '@/components';
  import { useTypingTestStore } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';

  const store = useTypingTestStore();
  const { started, isFinished, result } = storeToRefs(store);
</script>

<template>
  <div class="w-full min-h-dvh relative">
    <div class="max-w-7xl w-full mx-auto py-8">
      <Header />
      <main
        v-if="isFinished && result"
        class="mt-16"
      >
        <TypingResults :result="result" />
      </main>
      <main
        v-else
        class="mt-16 space-y-8"
      >
        <Stats />
        <TypingArea />
        <Footer v-if="started" />
      </main>
    </div>
  </div>
</template>
