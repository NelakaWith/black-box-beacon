<script setup lang="ts">
// No script needed for this demo
</script>

<template>
  <div class="min-h-screen bg-background text-white font-sans">
    <!-- Header -->
    <header class="bg-surface border-b border-border p-6">
      <h1 class="text-3xl font-mono text-beacon-400 animate-pulse-slow">
        Black Box Beacon
      </h1>
      <p class="text-gray-300 mt-2">Flight Recorder Theme Demo</p>
    </header>

    <!-- Main Content -->
    <main class="p-6 space-y-8">
      <!-- Color Palette Demo -->
      <section>
        <h2 class="text-2xl font-mono text-beacon-300 mb-4">Beacon Colors</h2>
        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="shade in [
              50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
            ]"
            :key="shade"
            :class="`bg-beacon-${shade} text-black p-4 rounded font-mono text-sm`"
          >
            beacon-{{ shade }}
          </div>
        </div>
      </section>

      <!-- Theme Colors Demo -->
      <section>
        <h2 class="text-2xl font-mono text-beacon-300 mb-4">Theme Colors</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-background text-white p-4 rounded font-mono">
            background
          </div>
          <div class="bg-surface text-white p-4 rounded font-mono">surface</div>
          <div class="bg-border text-white p-4 rounded font-mono">border</div>
        </div>
      </section>

      <!-- Typography Demo -->
      <section>
        <h2 class="text-2xl font-mono text-beacon-300 mb-4">Typography</h2>
        <div class="space-y-4">
          <p class="font-sans text-lg">
            Sans-serif font: Inter, system-ui, sans-serif
          </p>
          <p class="font-mono text-lg bg-surface p-4 rounded">
            Mono font: JetBrains Mono, Fira Code, ui-monospace
          </p>
        </div>
      </section>

      <!-- Animation Demo -->
      <section>
        <h2 class="text-2xl font-mono text-beacon-300 mb-4">Animations</h2>
        <div
          class="bg-beacon-500 text-black p-4 rounded font-mono animate-pulse-slow"
        >
          Pulse Slow Animation (4s duration)
        </div>
      </section>

      <!-- Interactive Elements -->
      <section>
        <h2 class="text-2xl font-mono text-beacon-300 mb-4">
          Interactive Elements
        </h2>
        <div class="space-y-4">
          <button
            class="bg-beacon-600 hover:bg-beacon-500 text-black px-6 py-3 rounded font-mono transition-colors"
          >
            Beacon Button
          </button>
          <div class="bg-surface border border-border p-4 rounded">
            <input
              type="text"
              placeholder="Flight recorder input..."
              class="bg-background border border-border rounded px-3 py-2 font-mono text-white placeholder-gray-400 w-full"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* No additional styles needed - using Tailwind classes */
</style>
