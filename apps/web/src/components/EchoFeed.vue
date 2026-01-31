<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center px-1">
      <span class="text-[10px] uppercase text-neutral-500 tracking-[0.3em]">System Log Feed</span>
      <div class="flex gap-1">
        <span class="w-1 h-1 bg-beacon-500 rounded-full animate-pulse"></span>
        <span class="w-1 h-1 bg-beacon-500/50 rounded-full"></span>
      </div>
    </div>

    <TransitionGroup
      name="data-sync"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="log in logs"
        :key="log.id"
        class="text-[10px] flex gap-4 p-4 bg-surface/20 border-l-2 border-beacon-500/40 text-neutral-500 font-mono items-baseline hover:bg-surface/30 transition-colors"
      >
        <div class="flex flex-col text-right min-w-[80px]">
           <span class="text-beacon-muted font-bold">[{{ formatTime(log.timestamp) }}]</span>
           <span class="text-[9px] opacity-50">ID_{{ log.id.slice(0,4) }}</span>
        </div>
        <span class="uppercase tracking-tight leading-relaxed text-neutral-400">{{ log.content }}</span>
      </div>
    </TransitionGroup>

    <div v-if="logs.length === 0" class="text-center py-12 text-white/10 font-mono text-[10px] tracking-widest uppercase">
      // Awaiting Transmission...
    </div>
  </div>
</template>

<script setup lang="ts">
interface Log {
  id: string;
  content: string;
  timestamp: Date;
}

defineProps<{
  logs: Log[]
}>();

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
}
</script>

<style scoped>
/*
  "Data Sync" Animation (0.6s Slide In)
  Mimics rows of text populating a terminal buffer
*/
.data-sync-enter-active,
.data-sync-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.data-sync-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.data-sync-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
