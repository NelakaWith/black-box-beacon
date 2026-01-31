<template>
  <Card class="!bg-transparent !border-none !shadow-none !rounded-none">
    <template #title>
      <div class="text-[10px] uppercase tracking-[0.3em] text-beacon-500 font-bold mb-4 flex items-center gap-2">
        <i class="pi pi-shield text-base" />
        Survival_Telemetry
      </div>
    </template>
    <template #content>
      <div class="space-y-3">
        <Button
          v-for="state in states"
          :key="state.key"
          @click="toggle(state.key)"
          unstyled
          class="w-full flex justify-between items-center p-4 border !rounded-none transition-all group cursor-pointer"
          :class="[
            telemetry[state.key]
              ? 'bg-beacon-500/10 border-beacon-500/50'
              : 'bg-surface/20 border-white/5 hover:border-beacon-500/30'
          ]"
        >
          <span class="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 font-mono">
            {{ state.label }}
          </span>

          <i
            v-if="telemetry[state.key]"
            class="pi pi-check-circle text-base text-beacon-500 shadow-[0_0_10px_var(--color-beacon-500)]"
          />
          <i v-else class="pi pi-circle text-base text-neutral-800" />
        </Button>
      </div>

      <div class="mt-6 p-4 bg-surface/40 border border-white/10 border-dashed text-[10px] text-neutral-600 uppercase leading-relaxed tracking-widest italic font-mono">
         The Beacon documents without judgment.
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

// Define the shape of our telemetry data
interface TelemetryData {
  ate: boolean;
  slept: boolean;
  hydrated: boolean;
  [key: string]: boolean; // Index signature for dynamic access
}

// Persist state to local storage
const telemetry = useLocalStorage<TelemetryData>('black-box-telemetry', {
  ate: false,
  slept: false,
  hydrated: false
});

const states = [
  { key: 'ate', label: 'ATE' },
  { key: 'slept', label: 'SLEPT' },
  { key: 'hydrated', label: 'HYDRATED' }
];

function toggle(key: string) {
  telemetry.value[key] = !telemetry.value[key];
  // Optional: Add sound effect trigger here
}
</script>
