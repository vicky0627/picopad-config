<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center">
    <div class="max-w-2xl w-full p-8">
      <div class="text-center mb-12">
        <button class="btn btn-primary" @click="router.back()">Back</button>
      </div>

      <!-- Detected Keyboards -->
      <div v-if="detectedKeyboards.length > 0" class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Detected Keyboards</h2>
        <div class="grid gap-4">
          <div
            v-for="keyboard in detectedKeyboards"
            :key="keyboard.id"
            class="bg-base-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-base-300"
            @click="selectKeyboard(keyboard)"
          >
            <div>
              <h3 class="font-medium">{{ keyboard.name }}</h3>
              <p class="text-sm text-gray-500">{{ keyboard.path }}</p>
            </div>
            <i class="mdi mdi-chevron-right text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Setup New Keyboard -->
      <div class="bg-base-100 rounded-lg p-8">
        <h2 class="text-2xl font-semibold mb-4">Set Up New Keyboard</h2>
        <div class="space-y-4">
          <button
            class="btn btn-primary w-full"
            @click="setupNewKeyboard"
          >
            <i class="mdi mdi-plus-circle mr-2"></i>
            New Keyboard
          </button>
          <button
            class="btn w-full"
            @click="addExistingKeyboard"
          >
            <i class="mdi mdi-file-import mr-2"></i>
            Add existing Picopad keyboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToHistory, keyboardStore } from '../store'

interface Keyboard {
  id: string
  name: string
  path: string
  usingSerial?: boolean
}

const router = useRouter()
const detectedKeyboards = ref<Keyboard[]>([])

async function loadDetectedKeyboards() {
  try {
    const keyboards = await window.api.listKeyboards()
    detectedKeyboards.value = keyboards
  } catch (error) {
    console.error('Failed to load detected keyboards:', error)
  }
}

async function setupNewKeyboard() {
  console.log('setupNewKeyboard')
  router.push('/automatic-setup/circuit-python')
}

async function addExistingKeyboard() {
  const keyboard = await window.api.selectDrive()
  console.log(keyboard)
  if(!keyboard) return
  keyboardStore.import(keyboard)
  console.log(keyboardStore)
  if (keyboardStore.pogConfigured) {
    router.push('/configurator/keymap')
    // also save to history
    addToHistory(keyboardStore)
  } else {
    router.push('/setup-wizard')
  }
}

function selectKeyboard(keyboard: Keyboard) {
  selectKeyboardByPath(keyboard.path)
}

async function selectKeyboardByPath(path: string) {
    // We reuse the logic from addExistingKeyboard but with a known path
    const keyboard = await window.api.selectKeyboard({ path })
    if (!keyboard || keyboard.error) {
        console.error('Failed to load keyboard', keyboard)
        return
    }
    keyboardStore.import(keyboard)
    if (keyboardStore.pogConfigured) {
      router.push('/configurator/keymap')
      addToHistory(keyboardStore)
    } else {
      router.push('/setup-wizard')
    }
}

onMounted(() => {
  console.log('KeyboardSelector onMounted')
  loadDetectedKeyboards()
})
</script>
