<template>
  <div class="w-full main-layout min-h-screen flex flex-col">
    <app-header />
    <main class="flex-1 p-4 max-w-7xl mx-auto">
      <router-view />
    </main>
    <footer class="bg-muted p-4 text-center">
      <p>&copy; 2024 Black Box Beacon</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";

// Main layout component
</script>

<style scoped></style>
