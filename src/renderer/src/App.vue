<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { addToHistory, keyboardStore, notifications, serialKeyboards } from './store'
import { addSerialLine } from './store/serial'

import { useRouter, useRoute } from 'vue-router'
import LoadingOverlay from './components/LoadingOverlay.vue'
import SplashScreen from './components/SplashScreen.vue'

import SettingsModal from './components/SettingsModal.vue'

const router = useRouter()
const route = useRoute()
const showSplash = ref(true)
const showSettings = ref(false)

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 2500)
})
const store = computed(() => {
  return keyboardStore
})
console.log('store added to debug menu', store)

window.api.keyboardScan((_event: Event, value: { keyboards: any[] }) => {
  console.log('found keyboards via serial', value)
  serialKeyboards.value = value.keyboards.map((a) => {
    const b = a
    b.port = b.path
    delete b.path
    return b
  })
})

window.api.serialKeyboardPogConfig((_event: Event, value: { pogconfig: any }) => {
  console.log('loaded pog config', value)
  keyboardStore.import({
    path: '',
    serial: true,
    folderContents: ['pog.json', 'kmk'],
    configContents: value.pogconfig
  })
  if (keyboardStore.pogConfigured) {
    addToHistory(keyboardStore)
  }
  router.push('/configurator/keymap')
})

let serialHandler: ((event: any, data: { message: string }) => void) | null = null
onMounted(() => {
  serialHandler = (_event, data) => addSerialLine(data.message)
  window.api.serialData(serialHandler)
})
onUnmounted(() => {
  if (serialHandler) window.api.offSerialData(serialHandler)
  serialHandler = null
})
</script>

<template>
  <div class="notifications">
    <div v-for="(notification, nindex) in notifications" class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ notification.label }}</span>
        <button class="btn btn-ghost btn-sm" @click="notifications.splice(nindex, 1)">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- VIA-style Top Navigation -->
  <nav v-if="!route.path.startsWith('/configurator')" class="bg-base-100/90 border-b border-secondary/20 backdrop-blur-md sticky top-0 z-50 w-full">
    <div class="w-full flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-6">
        <div 
          class="flex items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          @click="router.push('/')"
        >
          <img src="@renderer/assets/icon.png" class="w-8 h-8 rounded-full" />
          <span class="font-bold text-lg tracking-tight text-accent">Picopad</span>
        </div>
        
        <div class="flex gap-1 bg-secondary/20 p-1 rounded-lg">
          <button 
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
            :class="route.path !== '/tester' ? 'bg-secondary text-accent shadow-sm' : 'text-accent/60 hover:text-accent'"
            @click="router.push('/')"
          >
            CONFIGURE
          </button>
          <button 
            class="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
            :class="route.path === '/tester' ? 'bg-secondary text-accent shadow-sm' : 'text-accent/60 hover:text-accent'"
            @click="router.push('/tester')"
          >
            KEY TESTER
          </button>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <!-- Right side controls (Settings etc placeholder) -->
        <button class="btn btn-ghost btn-sm btn-circle text-accent/60" @click="showSettings = true" title="Settings">
          <i class="mdi mdi-cog text-lg"></i>
        </button>
      </div>
    </div>
  </nav>

  <div class="w-full" :class="{ 'pt-4': !route.path.startsWith('/configurator') }">
    <router-view></router-view>
  </div>

  <LoadingOverlay />
  <SplashScreen :show="showSplash" />
  <SettingsModal :open="showSettings" @close="showSettings = false" />

</template>
<style lang="postcss">
html,
body,
#app {
  height: 100%;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
}
.tooltip {
  @apply rounded bg-base-300 p-4 shadow;
  max-width: 300px;
}
.notifications {
  position: absolute;
  top: 0;
  display: flex;
  @apply z-20 flex-col gap-4 p-4;
}
</style>
