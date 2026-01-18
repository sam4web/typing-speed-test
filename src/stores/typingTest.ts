import data from '@/assets/data.json';
import { getRandomElement } from '@/utils/helpers';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export interface IOptions {
  difficulty: 'easy' | 'medium' | 'hard';
  mode: 'timed' | 'passage';
}

export interface IStats {
  wpm: number;
  accuracy: number;
  time: number;
}

const initialStatsState = {
  wpm: 0,
  accuracy: 100,
  time: 60,
};

export const useTypingTestStore = defineStore('typingTest', () => {
  // --- State ---
  const started = ref(false);
  const isFinished = ref(false);
  const personalBest = ref(Number(localStorage.getItem('personalBest')) || 0);

  const startTime = ref<number | null>(null);
  const timer = ref(60);
  const content = ref<string>('');
  const currentPos = ref(0);

  const typedResults = ref<Record<number, 'correct' | 'incorrect'>>({});
  const finalStats = ref<IStats>({ ...initialStatsState });

  const options = ref<IOptions>({
    difficulty: 'medium',
    mode: 'timed',
  });

  // --- Computed ---
  const isTimedMode = computed(() => options.value.mode === 'timed');

  const currentCounts = computed(() => {
    const results = Object.values(typedResults.value);
    return {
      total: results.length,
      correct: results.filter((r) => r === 'correct').length,
    };
  });

  const realTimeWPM = computed(() => {
    if (isFinished.value) return finalStats.value.wpm;
    if (!startTime.value || currentCounts.value.total === 0) return 0;
    const elapsedMinutes = (Date.now() - startTime.value) / 1000 / 60;
    return Math.round(currentCounts.value.total / 5 / Math.max(elapsedMinutes, 0.01));
  });

  const realTimeAccuracy = computed(() => {
    if (isFinished.value) return finalStats.value.accuracy;
    if (currentCounts.value.total === 0) return 100;
    return Math.round((currentCounts.value.correct / currentCounts.value.total) * 100);
  });

  // --- Actions ---
  function setNewContent() {
    content.value = getRandomElement(data[options.value.difficulty])?.text || '';
  }

  function startTest() {
    if (started.value) return;
    isFinished.value = false;
    currentPos.value = 0;
    typedResults.value = {};
    timer.value = 60;
    started.value = true;
    startTime.value = Date.now();
  }

  function endTest() {
    isFinished.value = true;
    started.value = false;
    finalStats.value = {
      wpm: realTimeWPM.value,
      accuracy: realTimeAccuracy.value,
      time: isTimedMode.value ? 60 - timer.value : 0,
    };
    if (finalStats.value.wpm > personalBest.value) {
      personalBest.value = finalStats.value.wpm;
      localStorage.setItem('personalBest', personalBest.value.toString());
    }
    stopTimer();
  }

  // --- Timer Logic ---
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
      if (timer.value > 0) timer.value -= 1;
      else endTest();
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // --- Watchers ---
  watch(
    () => options.value.difficulty,
    () => {
      if (!started.value) setNewContent();
    },
    { immediate: true },
  );

  watch(started, (val) => {
    if (val && isTimedMode.value) startTimer();
  });

  return {
    content,
    started,
    isFinished,
    personalBest,
    options,
    timer,
    currentPos,
    typedResults,
    realTimeWPM,
    realTimeAccuracy,
    finalStats,
    startTest,
    endTest,
    isTimedMode,
    stopTimer,
    setNewContent,
  };
});
