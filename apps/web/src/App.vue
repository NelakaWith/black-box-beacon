<script setup lang="ts">
// PrimeVue Button is globally registered via the BlackBoxUI plugin
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-8 p-10"
  >
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold tracking-tight">PrimeVue x Black Box</h1>
      <p class="text-muted-foreground">Component System Verification</p>
    </div>

    <!-- Usage of globally registered Button component -->
    <div
      class="flex flex-wrap gap-4 p-8 border border-border rounded-xl bg-surface/50 backdrop-blur-sm justify-center max-w-2xl"
    >
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
    </div>

    <div class="inline">
      <Button label="Small" size="small" variant="outlined" />
      <Button label="Normal" variant="outlined" />
      <Button label="Large" size="large" variant="outlined" />
    </div>
  </div>
</template>

<style scoped></style>
