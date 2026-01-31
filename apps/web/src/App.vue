<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-8 p-10"
  >
    <div class="absolute top-4 right-4">
      <Button
        @click="toggleDark()"
        :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
        :label="isDark ? 'Dark' : 'Light'"
        variant="text"
        severity="secondary"
      />
    </div>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { RouterView } from "vue-router";

// PrimeVue Button is globally registered via the BlackBoxUI plugin
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped></style>
