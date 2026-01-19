<script setup lang="ts">
  import { useTypingTestStore } from '@/stores/typingTest';
  import { storeToRefs } from 'pinia';
  import { computed, onUnmounted, watch } from 'vue';

  const store = useTypingTestStore();
  const { startTest, endTest } = store;
  const { started, content, typedResults, currentPos } = storeToRefs(store);

  const charList = computed(() => {
    return content.value.split('').map((char, index) => ({
      char,
      status: typedResults.value[index],
      isCurrent: index === currentPos.value,
      isSpace: char === ' ',
    }));
  });

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key.length > 1 && e.key !== 'Backspace') return;
    if (e.key === 'Backspace') {
      if (currentPos.value > 0) {
        delete typedResults.value[currentPos.value];
        currentPos.value -= 1;
      }
      return;
    }

    if (e.repeat) return;
    const isCorrect = e.key === content.value[currentPos.value];
    typedResults.value[currentPos.value] = isCorrect ? 'correct' : 'incorrect';
    if (currentPos.value < content.value.length) {
      currentPos.value += 1;
    }
  }

  watch(currentPos, (newPos) => {
    if (newPos === content.value.length) {
      endTest();
    }
  });

  watch(started, (enabled) => {
    if (enabled) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }
  });

  onUnmounted(() => document.removeEventListener('keydown', handleKeyPress));
</script>

<template>
  <div
    class="relative"
    @click="startTest"
  >
    <div
      v-if="!started"
      class="absolute size-full flex-center top-1/2 left-1/2 -translate-1/2 z-5"
    >
      <div class="flex-center flex-col space-y-3 md:space-y-5">
        <button
          @click="startTest"
          class="btn variant-primary"
        >
          Start Typing Test
        </button>
        <p class="text-xl text-center font-semibold text-neutral-0">
          Or click the text and
          <br class="inline-block sm:hidden" />
          start typing
        </p>
      </div>
    </div>

    <p
      class="text-[32px] lg:text-[40px] leading-[1.36] tracking-[0.4px] select-none"
      :class="started ? 'text-neutral-400' : 'text-neutral-0 opacity-45 blur-[6px]'"
    >
      <span
        v-for="(item, index) in charList"
        :key="index"
        class="relative transition-all duration-150 w-auto"
        :class="{
          spacechar: item.isSpace,
          correct: item.status === 'correct',
          incorrect: item.status === 'incorrect',
          highlight: item.isCurrent,
        }"
      >
        {{ item.char }}
      </span>
    </p>
  </div>
</template>

<style scoped>
  @reference "@/style.css";

  .highlight::after {
    @apply animate-pulse absolute top-1/2 left-1/2 -translate-1/2 content-[''] w-[110%] h-[90%] bg-neutral-0/20 rounded-sm;
  }

  .spacechar {
    @apply w-4 after:rounded-xs;

    &.incorrect {
      @apply bg-red-500/20 no-underline;
    }
  }

  .correct {
    @apply text-green-500;
  }

  .incorrect {
    @apply text-red-500 underline;
  }
</style>
