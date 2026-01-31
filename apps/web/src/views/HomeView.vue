<template>
  <div class="space-y-10 font-mono p-4 md:p-8 max-w-7xl mx-auto pb-32">
    <!-- Header Section -->
    <header class="flex items-center justify-between border-b border-white/5 pb-6 scanline">
      <div class="flex items-center gap-4">
        <i class="pi pi-broadcast text-beacon-500 animate-pulse-slow text-2xl" />
        <div>
          <h1 class="text-xl font-bold tracking-widest uppercase">Beacon_OS</h1>
          <div class="text-[9px] text-beacon-500/50 uppercase tracking-[0.4em] mt-1 flex gap-2">
            <span>Sub-Level Survival Monitor</span>
            <span v-if="!online" class="text-red-500 animate-pulse">! SIGNAL_LOST</span>
          </div>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Main Transmission Logic -->
      <div class="lg:col-span-2 space-y-12">
        <section>
          <PulseInput @commit="handleCommit" />
        </section>

        <section>
          <Transition name="fade" mode="out-in">
            <ResourceCard v-if="isCrisisMode" />
            <EchoFeed v-else :logs="logs" />
          </Transition>
        </section>
      </div>

      <!-- Telemetry Sidebar -->
      <aside class="space-y-8">
        <SurvivalTelemetry />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOnline } from '@vueuse/core';
import PulseInput from '@/components/PulseInput.vue';
import SurvivalTelemetry from '@/components/SurvivalTelemetry.vue';
import EchoFeed from '@/components/EchoFeed.vue';
import ResourceCard from '@/components/ResourceCard.vue';

// Checklist #4: "Physical Anchor Hook"
const online = useOnline();
const isCrisisMode = ref(false);

interface Log {
  id: string;
  content: string;
  timestamp: Date;
}

const logs = ref<Log[]>([]);

function handleCommit(content: string) {
  // Simple UI Trigger for "Crisis Mode" (Checklist #4)
  // In a real app, this would be more robust/server-side
  const crisisPattern = /(help|die|suicide|end it|hurt)/i;

  if (crisisPattern.test(content)) {
    isCrisisMode.value = true;
    return; // Do not log the entry
  }

  isCrisisMode.value = false;

  // Simulate API delay/Store action
  const newLog: Log = {
    id: crypto.randomUUID(),
    content: content,
    timestamp: new Date()
  };

  // Add to top of stack
  logs.value.unshift(newLog);
}
</script>

<style scoped>
/* Page transition for view change if needed */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
