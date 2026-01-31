<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground p-10 space-y-4">
    <h1 class="text-2xl font-bold">PrimeVue Migration Test</h1>
    <div class="flex gap-4 p-4 border border-white/10 rounded-lg">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
</style>
