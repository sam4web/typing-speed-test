import data from '@/assets/data.json';
import { initialStatsState } from '@/utils/constants';
import { getRandomElement } from '@/utils/helpers';
import type { IOptions, IResult } from '@/utils/types';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

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

  const result = ref<IResult | null>(null);

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
    if (isFinished.value) {
      return result.value ? result.value.wpm : 0;
    }
    if (!startTime.value || currentCounts.value.total === 0) return 0;
    const elapsedMinutes = (Date.now() - startTime.value) / 1000 / 60;
    return Math.round(currentCounts.value.total / 5 / Math.max(elapsedMinutes, 0.01));
  });

  const realTimeAccuracy = computed(() => {
    if (isFinished.value) {
      return result.value ? result.value.accuracy : 100;
    }
    if (currentCounts.value.total === 0) return 100;
    return Math.round((currentCounts.value.correct / currentCounts.value.total) * 100);
  });

  // --- Actions ---
  function setNewContent() {
    content.value = getRandomElement(data[options.value.difficulty])?.text || '';
  }

  function resetState() {
    stopTimer();
    started.value = false;
    isFinished.value = false;
    result.value = null;
    currentPos.value = 0;
    typedResults.value = {};
    startTime.value = null;
    timer.value = initialStatsState.time;
  }

  function startTest() {
    if (started.value) return;
    resetState();
    started.value = true;
    startTime.value = Date.now();
  }

  function endTest() {
    const finalWpm = realTimeWPM.value;
    const finalAccuracy = realTimeAccuracy.value;
    const { correct, total } = currentCounts.value;

    let type: IResult['type'] = 'COMPLETED';
    if (personalBest.value === 0) type = 'FIRST_TEST';
    else if (finalWpm > personalBest.value) type = 'HIGH_SCORE';

    if (type !== 'COMPLETED') {
      personalBest.value = finalWpm;
      localStorage.setItem('personalBest', finalWpm.toString());
    }

    result.value = {
      type,
      wpm: finalWpm,
      accuracy: finalAccuracy,
      characterCount: {
        correct: correct,
        incorrect: total - correct,
      },
    };

    isFinished.value = true;
    started.value = false;
    stopTimer();
  }

  function restartTest() {
    resetState();
    setNewContent();
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
      if (!started.value) {
        setNewContent();
      }
    },
    { immediate: true },
  );

  watch(started, (val) => {
    if (val && isTimedMode.value) {
      startTimer();
    }
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
    startTest,
    endTest,
    isTimedMode,
    stopTimer,
    setNewContent,
    result,
    restartTest,
  };
});
