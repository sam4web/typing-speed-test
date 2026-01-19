<script setup lang="ts">
  import { Attribution, Footer, Header, Stats, TypingArea, TypingResults } from '@/components';
  import { useTypingTestStore } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';

  const store = useTypingTestStore();
  const { started, isFinished, result } = storeToRefs(store);
</script>

<template>
  <div class="min-h-dvh relative">
    <div class="max-w-7xl w-full mx-auto p-4 lg:p-8">
      <Header />
      <main
        v-if="isFinished && result"
        class="mt-8 lg:mt-16"
      >
        <TypingResults :result="result" />
      </main>
      <main
        v-else
        class="mt-8 lg:mt-16 space-y-8"
      >
        <Stats />
        <TypingArea />
        <Footer v-if="started" />
      </main>
    </div>
    <Attribution />
  </div>
</template>
