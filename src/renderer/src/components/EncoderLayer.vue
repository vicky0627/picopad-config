<template>
  <div
    v-if="keyboardStore.encoderKeymap[lindex] && keyboardStore.encoderKeymap[lindex][eindex]"
    class="mb-4 flex items-center gap-4"
  >
    <p class="w-24">Layer {{ lindex }}</p>
    <div class="flex flex-col gap-1">
      <span class="text-xs font-bold text-base-content/70">CW</span>
      <input
        v-model="keyboardStore.encoderKeymap[lindex][eindex][0]"
        type="text"
        class="input input-bordered input-sm"
        @blur="handleBlur(0)"
      />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-xs font-bold text-base-content/70">CCW</span>
      <input
        v-model="keyboardStore.encoderKeymap[lindex][eindex][1]"
        type="text"
        class="input input-bordered input-sm"
        @blur="handleBlur(1)"
      />
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-xs font-bold text-base-content/70">Press</span>
      <input
        v-model="keyboardStore.encoderKeymap[lindex][eindex][2]"
        type="text"
        class="input input-bordered input-sm"
        @blur="handleBlur(2)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { keyboardStore } from '../store'
const props = defineProps(['lindex', 'layer', 'eindex'])
if (!keyboardStore.encoderKeymap[props.lindex]) {
  // create the layer
  keyboardStore.encoderKeymap[props.lindex] = []
}
if (!keyboardStore.encoderKeymap[props.lindex][props.eindex]) {
  keyboardStore.encoderKeymap[props.lindex][props.eindex] = ['KC.TRNS', 'KC.TRNS', 'KC.TRNS']
}
// Ensure 3rd element exists for existing configs
if (keyboardStore.encoderKeymap[props.lindex][props.eindex].length < 3) {
   keyboardStore.encoderKeymap[props.lindex][props.eindex][2] = 'KC.TRNS'
}

const handleBlur = (index: number) => {
  const value = keyboardStore.encoderKeymap[props.lindex][props.eindex][index]
  if (!value || value === '▽') {
    keyboardStore.encoderKeymap[props.lindex][props.eindex][index] = 'KC.TRNS'
  }
}
</script>

<style lang="scss" scoped></style>
