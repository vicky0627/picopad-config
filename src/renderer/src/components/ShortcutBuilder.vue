<template>
  <div class="shortcut-builder p-6 bg-base-100/50 rounded-xl border border-base-content/10">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <h3 class="font-bold text-lg tracking-wide uppercase opacity-80">Shortcut Builder</h3>
    </div>
    
    <!-- Modifiers Grid -->
    <div class="grid grid-cols-4 gap-3 mb-6">
      <button 
        class="key-toggle" 
        :class="{ 'active': modifiers.ctrl }"
        @click="modifiers.ctrl = !modifiers.ctrl"
      >
        <span class="text-xs uppercase font-bold tracking-wider mb-1 opacity-50">Mod 1</span>
        <span class="text-lg font-bold">Ctrl</span>
      </button>
      
      <button 
        class="key-toggle" 
        :class="{ 'active': modifiers.shift }"
        @click="modifiers.shift = !modifiers.shift"
      >
        <span class="text-xs uppercase font-bold tracking-wider mb-1 opacity-50">Mod 2</span>
        <span class="text-lg font-bold">Shift</span>
      </button>

      <button 
        class="key-toggle" 
        :class="{ 'active': modifiers.alt }"
        @click="modifiers.alt = !modifiers.alt"
      >
        <span class="text-xs uppercase font-bold tracking-wider mb-1 opacity-50">Mod 3</span>
        <span class="text-lg font-bold">Alt</span>
      </button>

      <button 
        class="key-toggle" 
        :class="{ 'active': modifiers.win }"
        @click="modifiers.win = !modifiers.win"
      >
        <span class="text-xs uppercase font-bold tracking-wider mb-1 opacity-50">Mod 4</span>
        <span class="text-lg font-bold">Win</span>
      </button>
    </div>

    <!-- Main Action Key -->
    <div class="mb-6 relative">
      <label class="text-xs uppercase font-bold tracking-wider opacity-50 mb-2 block">Trigger Key</label>
      <div class="relative group">
        <select 
          v-model="selectedKey" 
          class="select select-bordered w-full h-14 pl-4 pr-10 text-lg font-medium bg-base-200 focus:outline-none focus:border-primary transition-all"
        >
          <option disabled value="">Select a key...</option>
          <optgroup label="Letters" class="font-mono">
            <option v-for="l in letters" :key="l" :value="'KC.' + l">{{ l }}</option>
          </optgroup>
          <optgroup label="Numbers" class="font-mono">
            <option v-for="n in numbers" :key="n" :value="'KC.N' + n">{{ n }}</option>
          </optgroup>
          <optgroup label="F-Keys" class="font-mono">
            <option v-for="f in fKeys" :key="f" :value="'KC.F' + f">F{{ f }}</option>
          </optgroup>
          <optgroup label="Navigation">
            <option value="KC.UP">Up Arrow</option>
            <option value="KC.DOWN">Down Arrow</option>
            <option value="KC.LEFT">Left Arrow</option>
            <option value="KC.RIGHT">Right Arrow</option>
            <option value="KC.HOME">Home</option>
            <option value="KC.END">End</option>
            <option value="KC.PGUP">Page Up</option>
            <option value="KC.PGDOWN">Page Down</option>
            <option value="KC.TAB">Tab</option>
            <option value="KC.ENT">Enter</option>
            <option value="KC.ESC">Escape</option>
            <option value="KC.SPC">Space</option>
            <option value="KC.BSPC">Backspace</option>
            <option value="KC.DEL">Delete</option>
          </optgroup>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
          <i class="mdi mdi-chevron-down text-xl"></i>
        </div>
      </div>
    </div>

    <!-- Preview Bar -->
    <div class="bg-base-300/50 p-4 rounded-xl border border-base-content/5 flex items-center justify-between group hover:border-primary/30 transition-all">
      <div class="flex flex-col">
        <span class="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-1">Preview</span>
        <div class="flex items-center gap-2 h-8">
          <span v-if="!isValid" class="text-base-content/30 italic">No key selected</span>
          <span v-else class="font-mono font-bold text-xl text-primary tracking-tight">
            {{ previewText }}
          </span>
        </div>
      </div>
      
      <button 
        class="btn btn-primary px-6 transition-all duration-300" 
        :class="{ 'opacity-50 cursor-not-allowed': !isValid, 'hover:scale-105 shadow-lg shadow-primary/20': isValid }"
        :disabled="!isValid"
        @click="generateShortcut"
      >
        <span class="mr-2">Create</span>
        <i class="mdi mdi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['setKey'])

const modifiers = ref({
  ctrl: false,
  shift: false,
  alt: false,
  win: false
})

const selectedKey = ref('')



const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const numbers = '0123456789'.split('')
const fKeys = Array.from({length: 12}, (_, i) => i + 1)

const previewText = computed(() => {
  const parts: string[] = []
  if (modifiers.value.ctrl) parts.push('Ctrl')
  if (modifiers.value.shift) parts.push('Shift')
  if (modifiers.value.alt) parts.push('Alt')
  if (modifiers.value.win) parts.push('Win')
  
  if (selectedKey.value) {
    const keyLabel = selectedKey.value.replace('KC.', '').replace('N', '')
    parts.push(keyLabel)
  }
  
  return parts.length > 0 ? parts.join(' + ') : 'None'
})

const isValid = computed(() => {
  return selectedKey.value !== ''
})

const generateShortcut = () => {
  if (!isValid.value) return

  // Build the macro
  // Format: KC.MACRO(Press(MODS), Tap(KEY), Release(MODS))
  // KMK macros usually handle press/release automatically if wrapped in SEQUENCE but using explicit Press/Release is safer for combos
  
  const pressOps: string[] = []
  const releaseOps: string[] = []
  
  if (modifiers.value.win) {
    pressOps.push('Press(KC.LGUI)')
    releaseOps.unshift('Release(KC.LGUI)')
  }
  if (modifiers.value.ctrl) {
    pressOps.push('Press(KC.LCTRL)')
    releaseOps.unshift('Release(KC.LCTRL)')
  }
  if (modifiers.value.shift) {
    pressOps.push('Press(KC.LSHIFT)')
    releaseOps.unshift('Release(KC.LSHIFT)')
  }
  if (modifiers.value.alt) {
    pressOps.push('Press(KC.LALT)')
    releaseOps.unshift('Release(KC.LALT)')
  }

  const keyOp = `Tap(${selectedKey.value})`
  
  const allOps = [...pressOps, keyOp, ...releaseOps]
  const macroString = `KC.MACRO(${allOps.join(', ')})`
  
  emit('setKey', macroString)
}

</script>

<style scoped>
.key-toggle {
  @apply relative h-20 w-full rounded-xl border-2 border-base-content/10 bg-base-200 transition-all duration-200 flex flex-col items-center justify-center;
}

.key-toggle:hover {
  @apply border-primary/50 bg-base-300 -translate-y-0.5 shadow-lg shadow-primary/5;
}

.key-toggle.active {
  @apply border-primary bg-primary text-primary-content shadow-lg shadow-primary/30 scale-95;
}

.key-toggle.active span {
  @apply opacity-100;
}
</style>
