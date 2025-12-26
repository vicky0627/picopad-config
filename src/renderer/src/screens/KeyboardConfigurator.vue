<template>
  <div class="flex h-screen">
    <ul
      class="menu flex-shrink-0 bg-base-200/95 backdrop-blur-md border-r border-base-content/10 z-20 text-base-content"
      :class="{
        'menu-open': menuOpen
      }"
    >

      <li class="flex items-center p-4 pt-0">
        <span
          class="w-full cursor-pointer rounded bg-base-300 text-center text-xs"
          @click="reselectKeyboard"
        >
          <i class="mdi mdi-keyboard"></i>
          {{ keyboardStore.name }}</span
        >
      </li>
      <template v-for="(item, index) in menuItems" :key="index">
        <hr v-if="item.separator" class="border-base-content border-opacity-20 my-1" />
        <li v-else>
          <router-link
            :to="item.to"
            active-class="!opacity-100 !text-primary font-bold bg-base-300"
            class="opacity-70 transition-all hover:opacity-100 focus:text-primary focus:bg-transparent flex items-center gap-3 py-2"
          >
            <i class="mdi text-lg" :class="item.icon"></i>
            {{ item.label }}
          </router-link>
        </li>
      </template>
    </ul>
    <div class="flex h-full w-full flex-col overflow-y-auto">
      <div class="z-10 flex h-20 flex-shrink-0 items-center justify-between border-b border-base-content/10 bg-base-200/95 px-6 py-4 shadow-sm backdrop-blur-md">
        <h1
          id="navTitle"
          class="flex-grow overflow-hidden text-center text-3xl font-bold leading-[3rem]"
          contenteditable="true"
          spellcheck="false"
        >
          {{ currentRouteName }}
        </h1>
        <ProfileSelector class="mr-6" />

        <div class="mr-4 btn btn-primary btn-sm h-10 min-h-0" @click="saveKeymap" title="Save Keymap">
          <i class="mdi mdi-content-save text-xl"></i>
        </div>
        <div class="btn btn-sm h-10 min-h-0" :class="{ 'btn-primary': showDebug }" @click="toggleDebug" title="Debug">
          <i class="mdi mdi-bug text-xl"></i>
        </div>
      </div>
      <div class="relative flex flex-grow animate-enter overflow-hidden bg-transparent delay-100">
        <div class="z-10 flex-grow overflow-y-auto p-10">
          <router-view></router-view>
        </div>
        <div
          v-show="showDebug"
          class="w-[600px] flex-shrink-0 overflow-y-auto border-l border-base-content/10 bg-base-100 p-6"
        >
          <Debug />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addToHistory, keyboardStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import ProfileSelector from '../components/ProfileSelector.vue'
import Debug from '../components/debug.vue'
import { saveConfigurationWithLoading } from '../helpers/saveConfigurationWrapper'

const router = useRouter()
const route = useRoute()
const showDebug = ref(false)

const menuItems = [
  { to: '/configurator/keymap', label: 'Keymap', icon: 'mdi-alphabetical-variant' },
  { to: '/configurator/layout-editor', label: 'Keyboard Layout', icon: 'mdi-keyboard-variant' },
  { to: '/configurator/encoder', label: 'Encoder', icon: 'mdi-axis-z-rotate-clockwise' },
  { to: '/configurator/rgb', label: 'RGB', icon: 'mdi-led-on' },
  { separator: true, to: '', label: '', icon: '' },
  { to: '/configurator/manual', label: 'User Manual', icon: 'mdi-book-open-variant' },
  { to: '/configurator/info', label: 'Info', icon: 'mdi-information-outline' },
  { to: '/configurator/matrix', label: 'Matrix', icon: 'mdi-grid' },
  { to: '/configurator/pins', label: 'Pins', icon: 'mdi-electric-switch' },
  { to: '/configurator/coordmap', label: 'CoordMap', icon: 'mdi-sort-numeric-ascending' },
  { to: '/configurator/raw-keymap', label: 'Raw Keymap', icon: 'mdi-code-brackets' },
  { to: '/configurator/firmware', label: 'Firmware', icon: 'mdi-flash' }
]

// nav guard
console.log('path is', keyboardStore.path)
if (!keyboardStore.path && !keyboardStore.usingSerial) {
  router.push('/')
}

const toggleDebug = () => {
  showDebug.value = !showDebug.value
}

const reselectKeyboard = () => {
  window.api.deselectKeyboard()
  router.push('/')
}

const saveKeymap = async () => {
  try {
    keyboardStore.coordMapSetup = false
    const keyboardData = keyboardStore.serialize()
    addToHistory(keyboardStore)
    console.log(keyboardStore.coordMapSetup)
    await saveConfigurationWithLoading(
      JSON.stringify({ pogConfig: keyboardData, serial: keyboardStore.usingSerial })
    )
  } catch (error) {
    console.error('Error saving keymap:', error)
  }
}

const currentRouteName = computed(() => route.matched[1]?.name)

const menuOpen = ref(true)



onMounted(() => {
  const title = document.getElementById('navTitle')
  title?.addEventListener('blur', () => {
    if (typeof currentRouteName.value === 'string') {
      title.innerText = currentRouteName.value
    }
  })
  title?.addEventListener('focus', () => {
    title.innerText = ''
  })
})


</script>

<style lang="scss" scoped>
.menu {
  width: 80px;
  overflow: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;
  * {
    white-space: nowrap;
  }
}
.menu-open {
  width: 200px;
  position: relative;
  height: 100vh;
}
/* Fallback spinner animation in case Tailwind's animate-spin is unavailable */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
