<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-8"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped></style>
