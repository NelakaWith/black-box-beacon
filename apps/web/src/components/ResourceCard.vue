<template>
  <Card class="!bg-red-900/10 !border-l-2 !border-red-500 !shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] !rounded-none">
    <template #content>
      <div class="flex items-start gap-4 p-2">
        <i class="pi pi-exclamation-triangle text-red-500 text-xl animate-pulse" />
        <div class="space-y-4 w-full">
          <div>
            <h3 class="text-red-500 font-mono text-sm tracking-widest uppercase font-bold">
              // INTERVENTION_PROTOCOL_ACTIVE
            </h3>
            <p class="text-neutral-400 text-xs font-mono mt-2 leading-relaxed">
              Pattern matching suggests immediate risk. The "Black Box" is a record, not a solution.
              Please connect with a human operator.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <a
              href="tel:988"
              class="flex items-center justify-between p-3 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors group cursor-pointer text-decoration-none"
            >
              <span class="text-red-400 font-mono text-xs uppercase tracking-wider">Crisis Lifeline</span>
              <span class="text-white font-bold font-mono group-hover:text-red-400">988</span>
            </a>

            <a
              href="https://findahelpline.com"
              target="_blank"
              class="flex items-center justify-between p-3 border border-white/5 bg-surface/20 hover:border-white/10 transition-colors group cursor-pointer text-decoration-none"
            >
              <span class="text-neutral-500 font-mono text-xs uppercase tracking-wider group-hover:text-neutral-300">Global Database</span>
              <i class="pi pi-external-link text-neutral-600 text-xs group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
// No logic needed, purely presentational for this step
</script>
