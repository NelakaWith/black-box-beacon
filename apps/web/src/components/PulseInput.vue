<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center px-1">
      <span class="text-[10px] uppercase text-neutral-500 tracking-[0.3em]"
        >Primary Input Stream</span
      >
      <i class="pi pi-terminal text-xs text-neutral-700" />
    </div>

    <Textarea
      v-model="input"
      autoResize
      class="w-full bg-surface/50! border! border-neutral-100! dark:border-neutral-600! rounded-none! text-lg! p-6! focus:border-beacon-500! focus:ring-1! focus:ring-beacon-500/20! transition-all placeholder:text-neutral-700 shadow-none!"
      placeholder="Document the current state of the void..."
      spellcheck="false"
      rows="4"
    />

    <div class="flex justify-between items-center">
      <div
        class="text-[10px] text-beacon-500/50 font-mono"
        :class="{ 'opacity-0': !input }"
      >
        {{ input.length }} CHARS
      </div>

      <Button
        @click="commit"
        :disabled="!input || isProcessing"
        :loading="isProcessing"
        severity="primary"
        class="px-8! py-3! uppercase! tracking-[0.2em]! font-bold! rounded-none! shadow-beacon-pulse! text-xs! bg-beacon-500! text-white! hover:bg-beacon-600! disabled:opacity-50!"
        :icon="isProcessing ? 'pi pi-spin pi-cog' : 'pi pi-send'"
        :label="isProcessing ? 'Synchronizing...' : 'Transmit Pulse'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const input = ref("");
const isProcessing = ref(false);

const emit = defineEmits(["commit"]);

function commit() {
  if (!input.value.trim()) return;

  isProcessing.value = true;

  // Simulate "Handshake" delay
  setTimeout(() => {
    emit("commit", input.value);
    input.value = "";
    isProcessing.value = false;
  }, 1000);
}
</script>

<style scoped>
/*
  Force "Technical" scrollbar if content overflows (unlikely with autosize, but good fallback)
*/
textarea::-webkit-scrollbar {
  width: 4px;
}
textarea::-webkit-scrollbar-thumb {
  background: #333;
}
</style>
