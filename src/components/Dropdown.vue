<script setup lang="ts" generic="T">
  import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

  const props = defineProps<{
    disabled: boolean;
    active: T;
    options: { title: string; value: T }[];
  }>();

  const emit = defineEmits<{
    (e: 'click', value: T): void;
  }>();

  const open = ref(false);
  const dropdownRef = useTemplateRef('dropdown');

  const activeOption = computed(
    () => props.options.find((opt) => opt.value === props.active) || props.options[0],
  );

  function toggleDropdown() {
    if (props.disabled) return;
    open.value = !open.value;
  }

  function selectOption(value: T) {
    emit('click', value);
    open.value = false;
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      open.value = false;
    }
  };

  onMounted(() => document.addEventListener('click', handleClickOutside));
  onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<template>
  <div
    class="w-full relative"
    ref="dropdown"
  >
    <button
      type="button"
      :disabled="props.disabled"
      class="btn variant-select py-2 w-full flex-center gap-2.5"
      @click="toggleDropdown"
    >
      <span class="truncate">{{ activeOption!.title }}</span>
      <img
        src="@/assets/images/icon-down-arrow.svg"
        alt="dropdown icon"
        class="size-2.5 transition-all"
        :class="{ 'rotate-180': open }"
      />
    </button>

    <Transition name="fade">
      <div
        v-if="open && !props.disabled"
        class="absolute top-9 left-0 w-full bg-neutral-800 z-10 p-0.5 rounded-lg"
      >
        <button
          class="py-2 px-2.5 text-neutral-0 flex items-center gap-3"
          type="button"
          v-for="option in props.options"
          @click="selectOption(option.value)"
          :key="String(option.value)"
        >
          <div
            class="size-4 border rounded-full flex-center"
            :class="active === option.value ? 'bg-blue-400 border-blue-400!' : 'border-neutral-0'"
          >
            <div
              v-show="active === option.value"
              class="size-1.5 bg-neutral-900 rounded-full"
            />
          </div>
          <span>{{ option.title }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  @reference '@/style.css';

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease-out;
    @apply opacity-100 translate-y-0;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0 -translate-y-2;
    transition: all 0.2s ease-in;
  }
</style>
