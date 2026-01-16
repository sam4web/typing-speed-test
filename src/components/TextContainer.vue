<script setup lang="ts">
  import { useTypingTestStore } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';
  import { onUnmounted, watch } from 'vue';

  const store = useTypingTestStore();
  const { startTest } = store;
  const { started, content } = storeToRefs(store);

  function handleKeyPress(e: KeyboardEvent) {
    const key = e.key;
    if (key === 'Backspace') {
      console.log('remove');
    }
    console.log(key);
  }

  watch(started, (enabled) => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress);
  });
</script>

<template>
  <div
    class="relative"
    @click="startTest"
  >
    <div
      v-if="!started"
      class="absolute top-1/2 left-1/2 -translate-1/2 z-5"
    >
      <div class="flex-center flex-col space-y-5">
        <button
          @click="startTest"
          class="btn variant-primary"
        >
          Start Typing Test
        </button>
        <p class="text-xl font-semibold text-neutral-0">Or click the text and start typing</p>
      </div>
    </div>

    <p
      class="text-[40px] leading-[1.36] tracking-[0.4px] select-none"
      :class="started ? 'text-neutral-400' : 'text-neutral-0 opacity-45 blur-[6px]'"
    >
      {{ content }}
    </p>
  </div>
</template>
