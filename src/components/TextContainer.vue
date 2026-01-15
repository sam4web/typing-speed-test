<script setup lang="ts">
  import { ref } from 'vue';

  const started = ref(false);
  function startTest() {
    if (started.value) return;
    started.value = true;
  }
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
      class="text-[40px] leading-[1.36] tracking-[0.4px]"
      :class="started ? 'text-neutral-400' : 'text-neutral-0 opacity-45 blur-[6px] select-none'"
    >
      Coffee culture has evolved dramatically in recent decades. What was once a simple morning
      ritual has become an art form, with baristas crafting intricate latte designs and roasters
      sourcing beans from remote mountain villages. The humble cup of coffee now tells a global
      story.
    </p>
  </div>
</template>
