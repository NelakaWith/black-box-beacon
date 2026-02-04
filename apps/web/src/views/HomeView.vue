<template>
  <div class="space-y-10 font-mono p-4 md:p-8 mx-auto pb-32">
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
import { ref } from "vue";
import axios from "axios";
import { useLocalStorage } from "@vueuse/core";
import PulseInput from "@/components/PulseInput.vue";
import SurvivalTelemetry from "@/components/SurvivalTelemetry.vue";
import EchoFeed from "@/components/EchoFeed.vue";
import ResourceCard from "@/components/ResourceCard.vue";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const isCrisisMode = ref(false);

interface Log {
  id: string;
  content: string;
  timestamp: Date;
}

interface TelemetryData {
  ate: boolean;
  slept: boolean;
  hydrated: boolean;
}

const logs = ref<Log[]>([]);
const telemetry = useLocalStorage<TelemetryData>("black-box-telemetry", {
  ate: false,
  slept: false,
  hydrated: false,
});

async function handleCommit(content: string) {
  // Simple UI Trigger for "Crisis Mode" (Checklist #4)
  const crisisPattern = /(help|die|suicide|end it|hurt)/i;

  if (crisisPattern.test(content)) {
    isCrisisMode.value = true;
    return; // Do not log the entry
  }

  isCrisisMode.value = false;

  try {
    // Send pulse to API
    const response = await axios.post(`${API_URL}/pulse/transmit`, {
      content: content,
      metadata: {
        survivalCheck: {
          hydrated: telemetry.value.hydrated,
          ate: telemetry.value.ate,
          slept: telemetry.value.slept,
        },
      },
    });

    // Add successful response to logs
    const newLog: Log = {
      id: response.data.id,
      content: response.data.aiEchoResponse,
      timestamp: new Date(response.data.timestamp),
    };

    logs.value.unshift(newLog);
  } catch (error) {
    console.error("Failed to transmit pulse:", error);

    // Fallback: Add to local logs even if API fails
    const newLog: Log = {
      id: crypto.randomUUID(),
      content: content,
      timestamp: new Date(),
    };
    logs.value.unshift(newLog);
  }
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
