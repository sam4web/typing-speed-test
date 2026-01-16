<script setup lang="ts">
  import { Header, Stats, TextContainer } from '@/components';
  import { useTypingTestStore } from '@/stores/typingTest';
  import { onMounted } from 'vue';

  const { initStore } = useTypingTestStore();
  onMounted(initStore);
</script>

<template>
  <div class="max-w-7xl w-full mx-auto mt-8">
    <Header />
    <main class="my-16 space-y-8">
      <Stats />
      <TextContainer />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
