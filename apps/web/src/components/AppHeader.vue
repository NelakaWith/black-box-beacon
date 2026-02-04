<template>
  <!-- Header Section -->
  <header
    class="flex items-center justify-between border-b border-white/5 py-6 px-8 scanline"
  >
    <div class="flex items-center gap-4">
      <i class="pi pi-broadcast text-beacon-500 animate-pulse-slow text-2xl" />
      <div>
        <h1 class="text-xl font-bold tracking-widest uppercase">Beacon_OS</h1>
        <div
          class="text-[9px] text-beacon-500/50 uppercase tracking-[0.4em] mt-1 flex gap-2"
        >
          <span>Sub-Level Survival Monitor</span>
          <span v-if="!online" class="text-red-500 animate-pulse"
            >! SIGNAL_LOST</span
          >
        </div>
      </div>
    </div>
    <div>
      <Button
        @click="toggleDark()"
        :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
        :label="isDark ? 'Dark' : 'Light'"
        variant="text"
        severity="secondary"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useOnline, useDark, useToggle } from "@vueuse/core";

// Checklist #4: "Physical Anchor Hook"
const online = useOnline();
// PrimeVue Button is globally registered via the BlackBoxUI plugin
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style></style>
