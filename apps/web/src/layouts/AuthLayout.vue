<template>
  <div
    class="auth-layout min-h-screen flex items-center justify-center bg-background"
  >
    <div
      class="auth-container p-8 bg-card rounded-lg shadow-lg max-w-md w-full"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">Authentication</h2>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout component - dummy implementation
</script>

<style scoped>
.auth-layout {
  /* Additional styles if needed */
}
</style>
