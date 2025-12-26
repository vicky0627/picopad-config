<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-base-100 transition-opacity duration-700" :class="{ 'opacity-0 pointer-events-none': !show }">
    <div class="text-center">
      <div class="mb-4 relative inline-block">
        <!-- Pulse effect -->
        <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        <i class="mdi mdi-keyboard-variant text-8xl text-primary relative z-10 drop-shadow-[0_0_15px_rgba(var(--p),0.5)]"></i>
      </div>
      <h1 class="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
        PICOPAD
      </h1>
      <div class="mt-2 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <p class="mt-4 text-sm font-medium tracking-[0.3em] text-base-content/50 uppercase">Configuration Suite</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<style scoped>
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

@keyframes gradient-x {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
</style>
