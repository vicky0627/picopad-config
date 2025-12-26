<template>
  <div class="h-full w-full flex flex-col items-center justify-center px-6 py-8 text-white relative overflow-hidden">
    <div class="z-10 flex flex-col items-center gap-8">
      <h1 class="text-3xl font-bold font-['Outfit'] tracking-wide opacity-90 text-accent">Keyboard Tester</h1>
      <p class="text-accent/60">Press any key to test switches and hear the sound.</p>
      
      <div class="w-full max-w-2xl bg-base-200/80 p-8 rounded-2xl border border-secondary/20 shadow-2xl backdrop-blur-xl flex flex-col items-center gap-6 min-h-[300px]">
        <!-- Active Key Display -->
        <div class="flex flex-col items-center gap-2 h-32 justify-center">
          <div class="text-sm text-accent/50 uppercase tracking-widest font-bold">Actively Pressed</div>
          <div class="text-5xl font-black text-primary transition-all duration-75" :class="{ 'scale-110': activeKeys.size > 0 }">
             {{ Array.from(activeKeys).join(' + ') || 'Waiting...' }}
          </div>
        </div>

        <div class="h-px w-full bg-secondary/20 my-2"></div>

        <!-- History -->
        <div class="w-full flex flex-col gap-3">
          <div class="text-xs text-accent/50 uppercase font-bold tracking-wider flex justify-between items-center">
            <span>Detected Keys</span>
            <span class="text-accent/30">{{ testedKeys.size }} keys</span>
          </div>
          <div class="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto content-start">
            <div 
              v-for="key in Array.from(testedKeys)" 
              :key="key" 
              class="px-3 py-1 rounded bg-base-300 border border-secondary/30 text-accent font-mono text-sm shadow-sm"
            >
              {{ key }}
            </div>
             <div v-if="testedKeys.size === 0" class="text-accent/30 italic text-sm w-full text-center py-4">Start typing to test keys...</div>
          </div>
        </div>
      </div>
      
      <div class="flex gap-4 mt-8">
        <button class="btn btn-sm btn-ghost gap-2 text-accent/70 hover:text-accent" @click="resetTester">
          <i class="mdi mdi-refresh"></i> Reset
        </button>
        <button class="btn btn-sm btn-ghost gap-2 text-accent/70 hover:text-accent" @click="isMuted = !isMuted">
           <i class="mdi" :class="isMuted ? 'mdi-volume-off' : 'mdi-volume-high'"></i> {{ isMuted ? 'Sound Off' : 'Sound On' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const activeKeys = reactive(new Set<string>())
const testedKeys = reactive(new Set<string>())

// Simple click sound synthesis
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
const isMuted = ref(false)

const playClick = () => {
  if (isMuted.value) return
  if (audioCtx.state === 'suspended') audioCtx.resume()
  const t = audioCtx.currentTime
  
  // "Thock" part (low pass filtered noise/click)
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(150, t)
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.1)
  
  gain.gain.setValueAtTime(0.5, t)
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1)
  
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start(t)
  osc.stop(t + 0.1)

  // "Clack" part (high frequency tick)
  const osc2 = audioCtx.createOscillator()
  const gain2 = audioCtx.createGain()
  osc2.type = 'square'
  osc2.frequency.setValueAtTime(400, t)
  osc2.frequency.exponentialRampToValueAtTime(1000, t + 0.05)
  
  gain2.gain.setValueAtTime(0.1, t)
  gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.05)
  
  osc2.connect(gain2)
  gain2.connect(audioCtx.destination)
  osc2.start(t)
  osc2.stop(t + 0.05)
}

const handleDown = (e: KeyboardEvent) => {
  if (e.repeat) return
  playClick()
  activeKeys.add(e.code)
  testedKeys.add(e.code)
}

const handleUp = (e: KeyboardEvent) => {
  activeKeys.delete(e.code)
}

const resetTester = () => {
  testedKeys.clear()
  activeKeys.clear()
}

onMounted(() => {
  window.addEventListener('keydown', handleDown)
  window.addEventListener('keyup', handleUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleDown)
  window.removeEventListener('keyup', handleUp)
})


</script>
