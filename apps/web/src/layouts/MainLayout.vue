<template>
  <div class="main-layout min-h-screen flex flex-col">
    <header class="bg-primary text-primary-foreground p-4">
      <h1 class="text-xl font-bold">Black Box Beacon</h1>
    </header>
    <main class="flex-1 p-4">
      <router-view />
    </main>
    <footer class="bg-muted p-4 text-center">
      <p>&copy; 2024 Black Box Beacon</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Main layout component
</script>

<style scoped></style>
