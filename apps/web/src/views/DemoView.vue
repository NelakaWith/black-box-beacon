<template>
  <div class="space-y-10 font-mono">
    <!-- Header Section (Internal to Component) -->
    <header
      class="flex items-center justify-between border-b border-ui-border pb-6 scanline"
    >
      <div class="flex items-center gap-4">
        <RadioIcon class="text-beacon-500 animate-pulse-slow w-8 h-8" />
        <div>
          <h1 class="text-xl font-bold tracking-widest uppercase">Beacon_OS</h1>
          <p class="text-[9px] text-beacon-muted uppercase tracking-[0.4em]">
            Sub-Level Survival Monitor
          </p>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Main Transmission Logic -->
      <div class="lg:col-span-2 space-y-6">
        <section class="space-y-4">
          <div class="flex justify-between items-center px-1">
            <span
              class="text-[10px] uppercase text-neutral-500 tracking-[0.3em]"
              >Primary Input Stream</span
            >
            <TerminalIcon class="w-3 h-3 text-neutral-700" />
          </div>

          <!-- PrimeVue Textarea -->
          <Textarea
            v-model="transmission"
            rows="10"
            placeholder="Document the current state of the void..."
            class="w-full bg-surface/50 border-ui-border rounded-none text-lg p-6 focus:border-beacon-500/50 focus:ring-1 focus:ring-beacon-500/20 transition-all placeholder:text-neutral-800"
          />

          <div class="flex justify-end">
            <!-- PrimeVue Button -->
            <Button
              @click="sendTransmission"
              :loading="isProcessing"
              severity="primary"
              class="px-12 py-4 uppercase tracking-[0.2em] font-bold rounded-none shadow-beacon-pulse"
              :icon="isProcessing ? 'pi pi-spin pi-spinner' : 'pi pi-send'"
              :label="isProcessing ? 'Transmitting Pulse' : 'Transmit Pulse'"
            >
            </Button>
          </div>
        </section>

        <!-- Dynamic Log Feed -->
        <transition-group name="log-fade" tag="div" class="space-y-2">
          <div
            v-for="log in logs"
            :key="log.time"
            class="text-[10px] flex gap-4 p-4 bg-surface/20 border-l-2 border-beacon-500/40 text-neutral-500 font-mono"
          >
            <span class="text-beacon-muted font-bold">[{{ log.time }}]</span>
            <span class="uppercase tracking-tight leading-relaxed">{{
              log.msg
            }}</span>
          </div>
        </transition-group>
      </div>

      <!-- Telemetry Sidebar -->
      <aside class="space-y-8">
        <Card class="glass-panel rounded-none border-ui-border">
          <template #title>
            <div
              class="text-[10px] uppercase tracking-[0.3em] text-beacon-500 font-bold mb-4 flex items-center gap-2"
            >
              <ShieldIcon class="w-4 h-4" />
              Survival_Telemetry
            </div>
          </template>
          <template #content>
            <div class="space-y-3">
              <button
                v-for="(val, key) in survival"
                :key="key"
                @click="toggleSurvival(key)"
                class="w-full flex justify-between items-center p-4 border border-ui-border/30 hover:border-beacon-500/30 transition-all group bg-surface/20"
              >
                <span
                  class="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300"
                  >{{ key }}</span
                >
                <CheckCircleIcon v-if="val" class="w-4 h-4 text-beacon-500" />
                <CircleIcon v-else class="w-4 h-4 text-neutral-800" />
              </button>
            </div>
          </template>
        </Card>

        <div
          class="p-6 bg-surface/40 border border-ui-border border-dashed text-[10px] text-neutral-600 uppercase leading-relaxed tracking-widest italic"
        >
          Every transmission is a factual event in the survival log. The Beacon
          documents without judgment.
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  Radio as RadioIcon,
  Send as SendIcon,
  Terminal as TerminalIcon,
  ShieldCheck as ShieldIcon,
  CheckCircle2 as CheckCircleIcon,
  Circle as CircleIcon,
} from "lucide-vue-next";

// PrimeVue components are used here
// Note: These are registered globally by your BlackBoxUI plugin
const transmission = ref("");
const isProcessing = ref(false);
const logs = ref<{ time: string; msg: string }[]>([]);

const survival = reactive({
  hydrated: false,
  ate: false,
  slept: false,
});

const sendTransmission = () => {
  if (!transmission.value.trim()) return;
  isProcessing.value = true;

  // Simulated System Commit
  setTimeout(() => {
    logs.value.unshift({
      time: new Date().toLocaleTimeString(),
      msg: "Transmission committed to Black Box Vault.",
    });
    transmission.value = "";
    isProcessing.value = false;

    // Reset survival checklist for next cycle
    Object.keys(survival).forEach(
      (k) => (survival[k as keyof typeof survival] = false),
    );
  }, 1200);
};

const toggleSurvival = (key: keyof typeof survival) => {
  survival[key] = !survival[key];
};
</script>

<style scoped>
.log-fade-enter-active {
  transition: all 0.6s ease-out;
}
.log-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
