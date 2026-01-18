<script setup lang="ts">
  import { Footer, Header, Results, Stats, TextContainer } from '@/components';
  import { useTypingTestStore } from '@/stores/typingTest';
  import type { TestResultType } from '@/utils/types';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';

  const store = useTypingTestStore();
  const { started, isFinished } = storeToRefs(store);

  const result = ref<TestResultType>('HIGH_SCORE');
</script>

<template>
  <div class="w-full min-h-dvh relative">
    <div class="max-w-7xl w-full mx-auto py-8">
      <Header />
      <main
        v-if="isFinished"
        class="mt-16"
      >
        <Results :type="result" />
      </main>
      <main
        v-else
        class="mt-16 space-y-8"
      >
        <Stats />
        <TextContainer />
        <Footer v-if="started" />
      </main>
    </div>
  </div>
</template>
