<template>
  <div
    class="tab font-bold"
    :class="{ 'tab-active': index === selectedLayer }"
    :style="{
      background: keyboardStore.layers[index].color || '#434343',
      color: 'white'
    }"
    @click="selectedLayer = index"
  >
    {{ index }} {{ keyboardStore.layers[index].name }}
    <Popper>
      <span class="edit-btn ml-4 px-1"><i class="mdi mdi-cog"></i></span>
      <template #content>
        <div class="popover text-left">
          <span>Name</span>
          <input v-model="keyboardStore.layers[index].name" class="input input-bordered input-sm" />
          <span>Color</span>
          <label class="relative">
            <div
              class="h-8 w-full cursor-pointer rounded border border-white border-opacity-40"
              :style="{ background: keyboardStore.layers[index].color }"
            ></div>
            <input
              v-model="keyboardStore.layers[index].color"
              type="color"
              style="visibility: hidden; position: absolute"
            />
          </label>
          <div class="mt-2 flex gap-2">
            <div
              class="colorswatch"
              style="background: #333"
              @click="keyboardStore.layers[index].color = undefined"
            ></div>
            <div
              class="colorswatch"
              style="background: #0ca508"
              @click="keyboardStore.layers[index].color = '#0ca508'"
            ></div>
            <div
              class="colorswatch"
              style="background: #259eb9"
              @click="keyboardStore.layers[index].color = '#259eb9'"
            ></div>
            <div
              class="colorswatch"
              style="background: #f28c18"
              @click="keyboardStore.layers[index].color = '#f28c18'"
            ></div>
          </div>
          <div class="divider my-1"></div>
          <div class="flex flex-col gap-1">
            <button class="btn btn-xs btn-ghost justify-start" @click="copyLayer">
              <i class="mdi mdi-content-copy mr-2"></i>Copy Layer
            </button>
            <button class="btn btn-xs btn-ghost justify-start" @click="pasteLayer">
              <i class="mdi mdi-content-paste mr-2"></i>Paste Layer
            </button>
          </div>
        </div>
      </template>
    </Popper>
  </div>
</template>
<script setup lang="ts">
import Popper from '@wlard/vue3-popper'
import { keyboardStore, selectedLayer } from '../store'
const props = defineProps(['layer', 'index'])
if (!keyboardStore.layers[props.index])
  keyboardStore.layers[props.index] = { name: '', color: undefined }

const copyLayer = () => {
  const layerData = {
    keymap: keyboardStore.keymap[props.index],
    encoderKeymap: keyboardStore.encoderKeymap[props.index]
  }
  localStorage.setItem('pog-layer-clipboard', JSON.stringify(layerData))
}

const pasteLayer = () => {
  const dataStr = localStorage.getItem('pog-layer-clipboard')
  if (!dataStr) return
  try {
    const data = JSON.parse(dataStr)
    if (data.keymap) {
      keyboardStore.keymap[props.index] = [...data.keymap]
    }
    if (data.encoderKeymap && keyboardStore.encoderKeymap[props.index]) {
      // Basic check for compatibility
       keyboardStore.encoderKeymap[props.index] = JSON.parse(JSON.stringify(data.encoderKeymap))
    }
  } catch (e) {
    console.error('Failed to paste layer', e)
  }
}
</script>
<style lang="scss" scoped>
.tab {
  @apply rounded pr-1;
  background: #434343;
  border: 2px solid transparent;
  opacity: 0.6;
  .edit-btn {
    opacity: 0.5;
    @apply rounded transition-all;
  }
  &:hover .edit-btn {
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }
}

.tab-active {
  @apply bg-primary font-bold text-black;
  border: white 2px solid;
  opacity: 1;
}
.popover {
  @apply rounded border border-white border-opacity-40 bg-base-100 p-2 shadow-2xl;
}
.colorswatch {
  height: 28px;
  width: 28px;
  @apply cursor-pointer rounded;
}
</style>
