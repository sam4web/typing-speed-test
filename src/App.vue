<script setup lang="ts">
  import { Footer, Header, Results, Stats, TextContainer } from '@/components';
  import { useTypingTestStore } from '@/stores/typingTest';
  import type { TestResultType } from '@/utils/types';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';

  const store = useTypingTestStore();
  const { started } = storeToRefs(store);
  const { initStore } = store;

  onMounted(initStore);
  const result = ref<TestResultType>('HIGH_SCORE');
</script>

<template>
  <div class="w-full min-h-dvh relative">
    <div class="max-w-7xl w-full mx-auto py-8">
      <Header />
      <!-- <main class="mt-16">
        <Results :type="result" />
      </main> -->
      <main class="mt-16 space-y-8">
        <Stats />
        <TextContainer />
        <Footer v-if="started" />
      </main>
    </div>
  </div>
</template>
