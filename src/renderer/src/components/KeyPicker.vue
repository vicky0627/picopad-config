<template>
  <div class="w-full flex flex-col items-center">
    <div v-show="showSecondary" class="secondary mb-4">
    <div class="category-tabs flex flex-wrap gap-2 justify-center bg-base-300 p-2 rounded-xl mb-6 shadow-inner">
      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'basic' }" 
        @click="category = 'basic'"
      >
        <i class="mdi mdi-keyboard-outline"></i>
        <span>Basic</span>
      </button>
      
      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'layers' }" 
        @click="category = 'layers'"
      >
        <i class="mdi mdi-layers-outline"></i>
        <span>Layers</span>
      </button>
      
      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'kmk' }" 
        @click="category = 'kmk'"
      >
        <i class="mdi mdi-chip"></i>
        <span>KMK</span>
      </button>
      
      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'app' }" 
        @click="category = 'app'"
      >
        <i class="mdi mdi-music-note-eighth"></i>
        <span>Media</span>
      </button>

      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'rgb' }" 
        @click="category = 'rgb'"
      >
        <i class="mdi mdi-palette-outline"></i>
        <span>RGB</span>
      </button>

      <div class="w-px h-8 bg-base-content/10 mx-1 self-center"></div>

      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'shortcuts' }" 
        @click="category = 'shortcuts'"
      >
        <i class="mdi mdi-lightning-bolt-outline"></i>
        <span>Shortcuts</span>
      </button>
      
      <button 
        class="cat-btn" 
        :class="{ 'active': category === 'launch' }" 
        @click="category = 'launch'"
      >
        <i class="mdi mdi-rocket-launch-outline"></i>
        <span>Launch</span>
      </button>
    </div>
    <div class="key-chooser">
      <div v-if="category === 'basic'" class="bonus">
        <!-- Alphas -->
        <div class="key" @click="setKey('KC.Q')">Q</div>
        <div class="key" @click="setKey('KC.W')">W</div>
        <div class="key" @click="setKey('KC.E')">E</div>
        <div class="key" @click="setKey('KC.R')">R</div>
        <div class="key" @click="setKey('KC.T')">T</div>
        <div class="key" @click="setKey('KC.Y')">Y</div>
        <div class="key" @click="setKey('KC.U')">U</div>
        <div class="key" @click="setKey('KC.I')">I</div>
        <div class="key" @click="setKey('KC.O')">O</div>
        <div class="key" @click="setKey('KC.P')">P</div>
        
        <div class="key" @click="setKey('KC.A')">A</div>
        <div class="key" @click="setKey('KC.S')">S</div>
        <div class="key" @click="setKey('KC.D')">D</div>
        <div class="key" @click="setKey('KC.F')">F</div>
        <div class="key" @click="setKey('KC.G')">G</div>
        <div class="key" @click="setKey('KC.H')">H</div>
        <div class="key" @click="setKey('KC.J')">J</div>
        <div class="key" @click="setKey('KC.K')">K</div>
        <div class="key" @click="setKey('KC.L')">L</div>
        
        <div class="key" @click="setKey('KC.Z')">Z</div>
        <div class="key" @click="setKey('KC.X')">X</div>
        <div class="key" @click="setKey('KC.C')">C</div>
        <div class="key" @click="setKey('KC.V')">V</div>
        <div class="key" @click="setKey('KC.B')">B</div>
        <div class="key" @click="setKey('KC.N')">N</div>
        <div class="key" @click="setKey('KC.M')">M</div>

        <!-- Numbers -->
        <div class="key" @click="setKey('KC.N1')">1</div>
        <div class="key" @click="setKey('KC.N2')">2</div>
        <div class="key" @click="setKey('KC.N3')">3</div>
        <div class="key" @click="setKey('KC.N4')">4</div>
        <div class="key" @click="setKey('KC.N5')">5</div>
        <div class="key" @click="setKey('KC.N6')">6</div>
        <div class="key" @click="setKey('KC.N7')">7</div>
        <div class="key" @click="setKey('KC.N8')">8</div>
        <div class="key" @click="setKey('KC.N9')">9</div>
        <div class="key" @click="setKey('KC.N0')">0</div>

        <div class="w-full h-0 basis-full"></div>

        <div class="key" @click="setKey('KC.NO')">Empty</div>
        <div class="key" @click="setKey('KC.TRNS')">▽</div>
        <div class="key" @click="setKey('KC.ESCAPE')">Esc</div>
        <div class="key" @click="setKey('KC.CAPSLOCK')">Caps</div>
        <div class="key" @click="setKey('KC.BSLASH')">\</div>
        <div class="key" @click="setKey('KC.BSPACE')">Backspace</div>

        <div class="key" @click="setKey('KC.KP_EQUAL')">=</div>
        <div class="key" @click="setKey('KC.KP_COMMA')">,</div>

        <div class="key" @click="setKey('KC.TILDE')">~</div>
        <div class="key" @click="setKey('KC.EXLM')">!</div>
        <div class="key" @click="setKey('KC.AT')">@</div>
        <div class="key" @click="setKey('KC.HASH')">#</div>
        <div class="key" @click="setKey('KC.DOLLAR')">$</div>
        <div class="key" @click="setKey('KC.PERCENT')">%</div>
        <div class="key" @click="setKey('KC.CIRCUMFLEX')">^</div>
        <div class="key" @click="setKey('KC.AMPERSAND')">&</div>
        <div class="key" @click="setKey('KC.ASTERISK')">*</div>
        <div class="key" @click="setKey('KC.LEFT_PAREN')">(</div>
        <div class="key" @click="setKey('KC.RIGHT_PAREN')">)</div>
        <div class="key" @click="setKey('KC.UNDERSCORE')">_</div>
        <div class="key" @click="setKey('KC.PLUS')">+</div>
        <div class="key" @click="setKey('KC.LCBR')">{</div>
        <div class="key" @click="setKey('KC.RCBR')">}</div>
        <div class="key" @click="setKey('KC.LABK')">&lt;</div>
        <div class="key" @click="setKey('KC.RABK')">&gt;</div>
        <div class="key" @click="setKey('KC.COLN')">:</div>
        <div class="key" @click="setKey('KC.PIPE')">|</div>
        <div class="key" @click="setKey('KC.QUES')">?</div>
        <div class="key" @click="setKey('KC.DQT')">"</div>
      </div>
    </div>
    <div v-if="category === 'layers'" class="key-chooser flex">
      <div class="bonus">
        <div class="group">
          <div
            v-for="(_layer, index) in keyboardStore.keymap"
            class="key"
            @click="setKey(`KC.MO(${index})`)"
          >
            MO({{ index }})
          </div>
        </div>
        <!--      <div class="key" @click="setKey('KC.LM()')">LM(l, mod)</div>-->
        <!--      <div class="key" @click="setKey('KC.LT()')">LT(l, kc)</div>-->
        <div class="group">
          <div
            v-for="(_layer, index) in keyboardStore.keymap"
            class="key"
            @click="setKey(`KC.TG(${index})`)"
          >
            TG({{ index }})
          </div>
        </div>
        <div class="group">
          <div
            v-for="(_layer, index) in keyboardStore.keymap"
            class="key"
            @click="setKey(`KC.TO(${index})`)"
          >
            TO({{ index }})
          </div>
        </div>
        <div class="group">
          <div
            v-for="(_layer, index) in keyboardStore.keymap"
            class="key"
            @click="setKey(`KC.TT(${index})`)"
          >
            TT({{ index }})
          </div>
        </div>
        <div class="group">
          <div
            v-for="(_layer, index) in keyboardStore.keymap"
            class="key"
            @click="setKey(`KC.LM(${index},KC.LGUI)`)"
          >
            LM({{ index }}, mod)
          </div>
        </div>
      </div>
      <div class="bonus"></div>
    </div>

    <div v-if="category === 'kmk'" class="key-chooser flex">
      <div class="bonus">
        <div class="key" @click="setKey('KC.RESET')">Reset</div>
        <div class="key" @click="setKey('KC.RELOAD')">Reload</div>
        <div class="key" @click="setKey('KC.DEBUG')">Debug</div>
        <div class="key" @click="setKey('KC.BKDL')">BKDL</div>
      </div>
    </div>
    <div v-if="category === 'app'" class="key-chooser flex">
      <div class="bonus">
        <div class="key" @click="setKey('KC.MPLY')">Play Pause</div>
        <div class="key" @click="setKey('KC.MUTE')">Mute</div>
        <div class="key" @click="setKey('KC.VOLD')">Vol Down</div>
        <div class="key" @click="setKey('KC.VOLU')">Vol Up</div>
        <div class="key" @click="setKey('KC.MFFD')">next track (OSX)</div>
        <div class="key" @click="setKey('KC.MRWD')">prev track (OSX)</div>

        <div class="key" @click="setKey('KC.MNXT')">next track (win)</div>
        <div class="key" @click="setKey('KC.MPRV')">prev track (win)</div>
        <div class="key" @click="setKey('KC.MSTP')">stop track (win)</div>

        <div class="key" @click="setKey('KC.BRIU')">bright up</div>
        <div class="key" @click="setKey('KC.BRID')">bright down</div>

        <div class="key" @click="setKey('KC.EJCT')">eject (OSX)</div>
      </div>
    </div>
    <div v-if="category === 'rgb'" class="key-chooser flex">
      <div class="bonus">
        <div class="key" @click="setKey('KC.RGB_TOG')">RGB Toggle</div>
        <div class="key" @click="setKey('KC.RGB_HUI')">RGB Hue increase</div>
        <div class="key" @click="setKey('KC.RGB_HUD')">RGB Hue decrease</div>
      </div>
    </div>
    <div v-if="category === 'shortcuts'" class="key-chooser flex flex-col gap-2">
      <!-- Custom Builder -->
      <ShortcutBuilder @set-key="setKey" />
      
      <div class="divider">PREDEFINED SHORTCUTS</div>

      <div class="row-label font-bold mt-2" style="width: 100%">SYSTEM</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.L), Release(KC.LGUI))')">Lock PC</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.ESC), Release(KC.LSHIFT), Release(KC.LCTRL))')">Task Manager</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.TAB), Release(KC.LGUI))')">Task View</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.I), Release(KC.LGUI))')">Settings</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.E), Release(KC.LGUI))')">Explorer</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI))')">Run</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.DOT), Release(KC.LGUI))')">Emoji</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Press(KC.LSHIFT), Tap(KC.S), Release(KC.LSHIFT), Release(KC.LGUI))')">Snip Tool</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.V), Release(KC.LGUI))')">Clipboard</div>
      </div>
      
      <div class="row-label font-bold mt-2" style="width: 100%">WINDOW MANAGEMENT</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.LEFT), Release(KC.LGUI))')">Snap Left</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.RIGHT), Release(KC.LGUI))')">Snap Right</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.UP), Release(KC.LGUI))')">Maximize</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.DOWN), Release(KC.LGUI))')">Minimize</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.D), Release(KC.LGUI))')">Show Desktop</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Press(KC.LCTRL), Tap(KC.D), Release(KC.LCTRL), Release(KC.LGUI))')">New Desktop</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Press(KC.LCTRL), Tap(KC.F4), Release(KC.LCTRL), Release(KC.LGUI))')">Close Desktop</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Press(KC.LCTRL), Tap(KC.RIGHT), Release(KC.LCTRL), Release(KC.LGUI))')">Next Desktop</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Press(KC.LCTRL), Tap(KC.LEFT), Release(KC.LCTRL), Release(KC.LGUI))')">Prev Desktop</div>
      </div>

      <div class="row-label font-bold mt-2" style="width: 100%">BROWSER</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.T), Release(KC.LCTRL))')">New Tab</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.W), Release(KC.LCTRL))')">Close Tab</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.T), Release(KC.LSHIFT), Release(KC.LCTRL))')">Reopen Tab</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.TAB), Release(KC.LCTRL))')">Next Tab</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.TAB), Release(KC.LSHIFT), Release(KC.LCTRL))')">Prev Tab</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.L), Release(KC.LCTRL))')">Focus Address</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.F), Release(KC.LCTRL))')">Find</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.DEL), Release(KC.LSHIFT), Release(KC.LCTRL))')">Clear Data</div>
      </div>

      <div class="row-label font-bold mt-2" style="width: 100%">DEVELOPER</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.P), Release(KC.LSHIFT), Release(KC.LCTRL))')">Command Palette</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.P), Release(KC.LCTRL))')">Quick Open</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.B), Release(KC.LCTRL))')">Toggle Sidebar</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Tap(KC.GRAVE), Release(KC.LCTRL))')">Toggle Terminal</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.F), Release(KC.LSHIFT), Release(KC.LCTRL))')">Find in Files</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LCTRL), Press(KC.LSHIFT), Tap(KC.I), Release(KC.LSHIFT), Release(KC.LCTRL))')">DevTools</div>
      </div>

      <div class="row-label font-bold mt-2" style="width: 100%">MEDIA</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.VOLU))')">Vol Up</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.VOLD))')">Vol Down</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.MUTE))')">Mute</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.MPLY))')">Play/Pause</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.MNXT))')">Next</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Tap(KC.MPRV))')">Prev</div>
      </div>
    </div>
    <div v-if="category === 'launch'" class="key-chooser flex flex-col gap-2">
      <div class="p-3 bg-base-300 rounded-lg w-full mb-2 border border-base-content/20">
        <h3 class="font-bold mb-2 text-sm uppercase text-primary">Custom Launcher</h3>
        <p class="text-xs mb-3 opacity-70">Creates a macro that opens the Windows "Run" dialog (Win+R), types your command, and presses Enter.</p>
        <div class="flex gap-2 items-center">
          <input type="text" v-model="launchTarget" placeholder="App (e.g. 'notepad') or URL (e.g. 'youtube.com')" class="input input-sm flex-1 bg-base-100 text-base-content font-mono border-base-content/20" @keyup.enter="createLaunchKey" />
          <button class="btn btn-sm btn-primary" @click="createLaunchKey">Create Key</button>
        </div>
      </div>

      <div class="row-label font-bold mt-2" style="width: 100%">APPS</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'calc\', Delay(100), Tap(KC.ENT))')">Calc</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'notepad\', Delay(100), Tap(KC.ENT))')">Notepad</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'cmd\', Delay(100), Tap(KC.ENT))')">Terminal</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'mspaint\', Delay(100), Tap(KC.ENT))')">Paint</div>
      </div>

      <div class="row-label font-bold mt-2" style="width: 100%">WEBSITES</div>
      <div class="bonus">
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'https://google.com\', Delay(100), Tap(KC.ENT))')">Google</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'https://youtube.com\', Delay(100), Tap(KC.ENT))')">YouTube</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'https://github.com\', Delay(100), Tap(KC.ENT))')">GitHub</div>
        <div class="key" style="width: auto; padding: 0 8px" @click="setKey('KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), \'https://chatgpt.com\', Delay(100), Tap(KC.ENT))')">ChatGPT</div>
      </div>

    </div>
  </div>

  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { keyboardStore } from '../store'

import ShortcutBuilder from './ShortcutBuilder.vue'

const layout = ref('qwerty')
const category = ref('basic')
const launchTarget = ref('')
const emit = defineEmits(['setKey'])

const props = defineProps<{
  showSecondary?: boolean
}>()

const showSecondary = computed(() => props.showSecondary !== false)

const setKey = (key: string | number) => {
  emit('setKey', String(key))
}

const createLaunchKey = () => {
    if(!launchTarget.value) return;
    const cmd = launchTarget.value.replace(/'/g, "\\'"); // escape single quotes
    const macro = `KC.MACRO(Press(KC.LGUI), Tap(KC.R), Release(KC.LGUI), Delay(500), '${cmd}', Delay(100), Tap(KC.ENT))`;
    setKey(macro);
    launchTarget.value = ''; // clear after setting
}

const scale = ref(1)
const scaleKeyboard = () => {
  const wrapper = document.querySelector('#keyboard-picker')
  const keyboard = document.querySelector('#keyboard-picker .key-chooser')
  if (!wrapper || !keyboard) return
  const ww = wrapper.getBoundingClientRect().width
  const wk = keyboard.getBoundingClientRect().width
  scale.value = Math.min(ww / wk, 1)
}
onMounted(() => {
  window.addEventListener('resize', () => scaleKeyboard())
  scaleKeyboard()
})
</script>

<style lang="scss">
:root {
  --key-size: 35px;
}
#keyboard-picker {
  @apply flex flex-wrap justify-center;
  transform-origin: center top;
}
.key-chooser {
  gap: 4px;
  @apply flex flex-col flex-wrap;
  .row {
    @apply flex;
    gap: 4px;
  }
  .bonus {
    margin-top: 20px;
    gap: 4px;
    @apply flex;
    flex-wrap: wrap;
    .key {
      width: calc(var(--key-size) * 1.4);
      height: calc(var(--key-size) * 1.4);
    }
  }
  .group {
    @apply mr-2 flex gap-1;
  }
  .blocker-half {
    width: calc(var(--key-size) / 2);
    height: var(--key-size);
    @apply shrink-0;
  }
  .blocker-full {
    height: var(--key-size);
    width: var(--key-size);
    @apply shrink-0;
  }
}

/* Base Key Style - Premium Dark Mechanical */
/* Base Key Style - Theme Aware */
.key {
  width: var(--key-size);
  height: var(--key-size);
  @apply bg-base-300 border border-base-content/20 shadow-md text-base-content font-semibold text-xs flex shrink-0 flex-col items-center justify-center rounded-lg transition-all relative select-none;
  
  cursor: pointer;
  
  &.sm {
    font-size: 10px;
  }
  
  i.mdi {
    font-size: 16px;
  }

  /* Hover State */
  &:hover {
    @apply bg-base-200 border-primary/50 text-white z-10 shadow-xl shadow-primary/30;
    transform: translateY(-2px);
  }

  /* Active/Click State */
  &:active {
    transform: translateY(1px);
    @apply bg-base-100 shadow-inner;
  }

  /* Sizing Utilities */
  &-2u { width: calc(var(--key-size) * 2 + 4px); }
  &-1-25u { width: calc(var(--key-size) * 1.25 + 2px); }
  &-1-5u { width: calc(var(--key-size) * 1.5 + 4px); }
  &-1-75u { width: calc(var(--key-size) * 1.75 + 4px); }
  &-2-25u { width: calc(var(--key-size) * 2.25 + 8px); }
  &-2-5u { width: calc(var(--key-size) * 2.5 + 8px); }
  &-6u { width: calc(var(--key-size) * 6.25 + 18px); }
}

/* Update bonus section keys (the category keys) to be slightly larger auto-width pills */
.bonus .key {
  width: auto !important;
  min-width: 40px;
  padding: 0 12px;
  height: 40px;
  @apply bg-base-300 border-base-content/20 rounded-lg;
}

.cat-btn {
  @apply btn btn-sm btn-ghost gap-2 h-9 px-4 rounded-lg font-medium opacity-70 transition-all hover:bg-base-100 hover:opacity-100;
}

.cat-btn.active {
  @apply btn-primary opacity-100 shadow-md shadow-primary/20;
}

.cat-btn i {
  @apply text-lg;
}
</style>
