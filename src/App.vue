<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import Stats from '@/components/Stats.vue';
  import TextContainer from '@/components/TextContainer.vue';
  import Footer from '@/components/Footer.vue';
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
