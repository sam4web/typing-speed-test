<script setup lang="ts">
  import { RESULT_CONTENT } from '@/utils/constants';
  import type { TestResultType } from '@/types/results';
  import { computed } from 'vue';

  const props = defineProps<{ type?: TestResultType }>();

  const currentContent = computed(() => {
    const isValidKey = !!props.type && props.type in RESULT_CONTENT;
    const type = isValidKey ? props.type : 'COMPLETED';
    return { type, ...RESULT_CONTENT[type] };
  });
</script>

<template>
  <template v-if="props.type === 'HIGH_SCORE'">
    <img
      src="@/assets/images/pattern-confetti.svg"
      class="absolute w-full left-0 bottom-0 select-none z-10"
    />
  </template>

  <template v-else>
    <img
      src="@/assets/images/pattern-star-1.svg"
      class="absolute size-18.5 left-[87.22%] top-[53.2%] select-none z-10"
    />
    <img
      src="@/assets/images/pattern-star-2.svg"
      class="absolute size-8 left-[7.57%] top-[24.51%] select-none z-10"
    />
  </template>

  <div class="flex-center flex-col text-center space-y-8 z-50 relative">
    <div v-if="currentContent.type === 'HIGH_SCORE'">
      <img
        class="size-full block"
        src="@/assets/images/icon-new-pb.svg"
        alt="high score smashed icon"
      />
    </div>
    <div
      v-else
      class="rounded-full inline-block glow-green"
    >
      <img
        src="@/assets/images/icon-completed.svg"
        alt="test completed icon"
        class="rounded-full size-full block"
      />
    </div>

    <div
      class="space-y-2.5"
      :class="{ 'pt-6': currentContent.type !== 'HIGH_SCORE' }"
    >
      <h2 class="text-neutral-0 text-[40px] font-bold leading-[1.36] tracking-[0.4px]">
        {{ currentContent.title }}
      </h2>
      <p class="text-neutral-400 font-normal text-xl leading-[1.2] tracking-[-0.6px]">
        {{ currentContent.description }}
      </p>
    </div>

    <div class="flex pt-5 pb-8 gap-5 text-left">
      <div class="min-w-40 w-full border-neutral-700 border px-6 py-4 rounded-xl space-y-3">
        <h3 class="text-neutral-400 font-normal text-xl leading-[1.2] tracking-[-0.6px]">WPM</h3>
        <p class="text-neutral-0 text-2xl font-bold">85</p>
      </div>
      <div class="min-w-40 w-full border-neutral-700 border px-6 py-4 rounded-xl space-y-3">
        <h3 class="text-neutral-400 font-normal text-xl leading-[1.2] tracking-[-0.6px]">
          Accuracy
        </h3>
        <p class="text-red-500 text-2xl font-bold">90%</p>
      </div>
      <div class="min-w-40 w-full border-neutral-700 border px-6 py-4 rounded-xl space-y-3">
        <h3 class="text-neutral-400 font-normal text-xl leading-[1.2] tracking-[-0.6px]">
          Characters
        </h3>
        <p class="text-2xl font-bold">
          <span class="text-green-500">120</span>
          <span class="text-neutral-500">/</span>
          <span class="text-red-500">5</span>
        </p>
      </div>
    </div>

    <button class="flex-center btn variant-secondary gap-2.5">
      <template v-if="props.type === 'COMPLETED'"> Go Again </template>
      <template v-else> Best This Score </template>
      <img
        class="size-5"
        src="@/assets/images/icon-restart.svg"
        alt="restart icon"
      />
    </button>
  </div>
</template>

<style scoped>
  @reference "@/style.css";
  .glow-green {
    @apply shadow-[0_0_0_16px_color-mix(in_srgb,var(--color-green-500),transparent_80%),0_0_0_32px_color-mix(in_srgb,var(--color-green-500),transparent_90%)];
  }
</style>
