import data from '@/assets/data.json';
import { getRandomElement } from '@/utils/helpers';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface IOptions {
  difficulty: 'easy' | 'medium' | 'hard';
  mode: 'timed' | 'passage';
}

export const useTypingTestStore = defineStore('typingTest', () => {
  const started = ref(false);
  const personalBest = ref(0);
  const content = ref<string | null>(null);

  const options = ref<IOptions>({
    difficulty: 'medium',
    mode: 'timed',
  });

  watch(
    () => options.value.difficulty,
    (newValue) => {
      const randomData = getRandomElement(data[newValue]);
      if (!randomData) return;
      content.value = randomData.text;
    },
    { immediate: true },
  );

  function initStore() {
    const saved = localStorage.getItem('personalBest');
    if (!saved) return;
    personalBest.value == JSON.parse(saved);
  }

  function startTest() {
    if (started.value) return;
    started.value = true;
  }

  function endTest() {
    started.value = false;
  }

  return { initStore, content, started, startTest, endTest, personalBest, options };
});
