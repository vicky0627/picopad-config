<template>
  <div
    v-if="visible"
    ref="keyElem"
    class="keycap transition-all group"
    @click.stop="handleKeyClick"
    style="user-select: none"
    :data-index="keyIndex"
    :style="{
      left: keyData.x * (baseKeyWidth + keyGap) + 'px',
      top: keyData.y * (baseKeyWidth + keyGap) + 'px',
      width: keyWidth + 'px',
      height: keyHeight + 'px',
      transform: `rotate(${keyData.r}deg)`,
      transformOrigin: rotationOrigin
    }"
    :class="{
      selected: mainSelected,
      'is-trns': isTRNS,
      encoder: typeof keyData.encoderIndex === 'number'
    }"
  >
    <div
      v-if="keyData.w2 || keyData.h2"
      class="keyborder-blocker bg-base-200"
      :style="{
        left: '1px',
        top: '4px',
        width: keyWidth - 2 + 'px',
        height: keyHeight - 8 + 'px'
      }"
    ></div>
    <div
      class="keyborder bg-base-300"
      :style="{
        width: keyWidth + 'px',
        height: keyHeight + 'px',
        backgroundColor: keyColorDark
      }"
    ></div>
    <div
      v-if="keyData.w2 || keyData.h2"
      class="keyborder bg-base-300"
      :class="{ selected: mainSelected }"
      :style="{
        left: keyData.x2 * baseKeyWidth - 1 + 'px',
        width: keyWidth2 + 'px',
        height: keyHeight2 + 'px'
      }"
    ></div>
    <div
      v-if="keyData.w2 || keyData.h2"
      class="keytop bg-base-200 group-hover:!bg-base-100"
      :style="{
        height: keyTopHeight2 + 'px',
        left: keyData.x2 * (baseKeyWidth + keyGap) + 1 + 'px',
        backgroundColor: keyColor
      }"
    ></div>
    <!--    <div-->
    <!--      class="keytop"-->
    <!--      @click="bgClick"-->
    <!--    ></div>-->
    <div
      v-else
      class="keytop bg-base-200 group-hover:!bg-base-100"
      :style="{
        top: !mainLabel || isSimple ? '4px' : '14px',
        height: keyTopHeight + 'px',
        background: keyColor
      }"
    ></div>
    <div v-if="!isSimple && mode !== 'layout'" class="keylabel-action">
      <div
        v-if="typeof keyData.encoderIndex === 'number' && mode !== 'layout'"
        class="encoder-labels flex w-full justify-between"
      >
        <div class="rounded px-1.5" v-html="encoderActionA"></div>
        <div class="rounded px-1.5" v-html="encoderActionB"></div>
      </div>
      <span v-else>
        {{ mainLabel.action }}
      </span>
    </div>
    <!--    <div class="keylabel-action"></div>-->
    <div
      class="keylabels"
      :class="{ 'has-args': !isSimple }"
      :style="{ height: keyTopHeight + 'px', top: !mainLabel || isSimple ? '4px' : '14px' }"
    >
      <!--      <div class="keylabel" :class="['keylabel-'+index]" v-for="(label,index) in keyData.labels">-->
      <!--        <div class="keylabel-inner">-->
      <!--          {{label}}-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="mainLabel" class="keylabel keylabel-center gap-1 flex items-center justify-center text-center">
        <span
          v-if="isSimple || typeof keyData.encoderIndex === 'number'"
          class="keylabel-main"
          v-html="mainLabel.action"
        ></span>
        <div v-else class="flex h-full flex-col justify-between p-1">
          <span
            class="keylabel-main"
            v-html="
              mainLabel.layerNamePosition === 'main'
                ? mainLabel.main + ' ' + layerName
                : mainLabel.main
            "
          ></span>
          <span
            class="keylabel-lower"
            v-html="
              mainLabel.layerNamePosition === 'lower'
                ? mainLabel.lower + ' ' + layerName
                : mainLabel.lower
            "
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, VNodeRef, watch } from 'vue'
import { selectedLayer, selectedKeys, userSettings } from '../store'
import { renderLabel } from '../helpers'
import chroma from 'chroma-js'
const props = defineProps([
  'keyData',
  'keyIndex',
  'mode',
  'keymap',
  'matrixWidth',
  'layouts',
  'wiringMethod'
])
defineEmits(['selected'])

const keyGap = 4
// hide normal labels and show the keymap thing
const action = computed(() => {
  if (props.mode === 'layout') return //String(props.keyData.matrix)
  let keyIndex = 0

  keyIndex = props.keyData.coordMapIndex
  if (!props.keymap[selectedLayer.value]) return 'No layer'
  const keyCode = props.keymap[selectedLayer.value][keyIndex]
  // resolve readable character
  if (!keyCode || keyCode === 'KC.TRNS') return '▽'
  return keyCode
})

const isTRNS = computed(() => {
  return action.value === '▽'
})

const visible = computed(() => {
  // hide decal keys
  if (props.keyData.d) {
    return false
  }
  // show correct variant
  const variant: number[] = props.keyData.variant
  if (variant) {
    if (variant.length !== 2) return false
    if (props.layouts[variant[0]]) return props.layouts[variant[0]].selected === variant[1]
  }
  // show keys that don't have variant
  return true
})

const baseKeyWidth = ref(54)
const keyWidthU = computed(() => {
  // if(props.keyData.w2) return props.keyData.w2
  return props.keyData.w || 1
})
const keyHeightU = computed(() => {
  return props.keyData.h || 1
})
const keyWidth2U = computed(() => {
  return props.keyData.w2 || 1
})
const keyHeight2U = computed(() => {
  return props.keyData.h2 || 1
})
const keyWidth = computed(() => {
  return keyWidthU.value * baseKeyWidth.value + (keyWidthU.value - 1) * keyGap
})
const keyHeight = computed(() => {
  return keyHeightU.value * baseKeyWidth.value + (keyHeightU.value - 1) * keyGap
})
const keyWidth2 = computed(() => {
  return keyWidth2U.value * baseKeyWidth.value + (keyWidth2U.value - 1) * keyGap
})
const keyHeight2 = computed(() => {
  return keyHeight2U.value * baseKeyWidth.value + (keyHeight2U.value - 1) * keyGap
})
// const hasArguments = computed(() => {
//   if (!action.value) return false
//   return action.value.includes(')')
// })
// const keyTopWidth = computed(() => {
//   return keyWidth.value - keyGap * 2 - 4 //+ ((keyWidthU.value-1)*keyGap))
// })
const keyTopHeight = computed(() => {
  let padding = 3
  if (mainLabel.value && !mainLabel.value.simple) padding += 10
  return keyHeight.value - padding * keyHeightU.value - keyGap + (keyHeightU.value - 1) * keyGap
})
// const keyTopWidth2 = computed(() => {
//   const padding = 0
//    return keyWidth2.value - padding * keyWidth2U.value - keyGap - 2 + (keyWidth2U.value - 1) * keyGap
// })
const keyTopHeight2 = computed(() => {
  const padding = 3
  return keyHeight2.value - padding * keyHeight2U.value - keyGap + (keyHeight2U.value - 1) * keyGap
})
const mainLabel = computed(() => {
  // in Layout Mode show the matrix pos
  if (props.mode === 'layout') {
    return {
      simple: true,
      action: props.keyData.getMatrixLabel(),
      layer: null,
      lower: '',
      main: '',
      layerNamePosition: ''
    }
  }
  // otherwise show the action from the keymap
  // if (!action.value) return {simple: true,action: '',}

  // render readable label
  return renderLabel(action.value)
})

// const argLabel = computed(() => {
//   if (hasArguments.value && action.value) {
//     const argAction = action.value.split('(')[1].replace(')', '')
//     if (argAction.startsWith('KC.')) {
//       return argAction.split('.')[1]
//     }
//     return argAction
//   }
//   return
// })

const mainSelected = ref(false)
const argsSelected = ref(false)
// const bgClick = (e:MouseEvent) => {
//   mainSelected.value = true;
//   argsSelected.value = false;
//   emit("selected", {
//     key: props.keyData.matrix,
//     args: argsSelected.value,
//     keyIndex: props.keyIndex,
//     added: e.shiftKey
//   });
// };
// const argClick = () => {
//   argsSelected.value = true;
//   mainSelected.value = false;
//   emit("selected", {
//     key: props.keyData.matrix,
//     args: argsSelected.value,
//     keyIndex: props.keyIndex,
//   });
// };

// watch(
//   () => selectedKey.value.key,
//   (newValue) => {
//     if (selectedKey.value.key !== props.keyData.matrix) {
//       mainSelected.value = false;
//       argsSelected.value = false;
//     }
//   }
// );
watch(
  () => [...selectedKeys.value],
  (_newValue) => {
    if (selectedKeys.value.has(props.keyIndex)) {
      mainSelected.value = true
      argsSelected.value = false
    } else {
      mainSelected.value = false
      argsSelected.value = false
    }
  }
)
const rotationOrigin = computed(() => {
  if (typeof props.keyData.rx !== 'number' || typeof props.keyData.ry !== 'number') return '0 0'
  const x = props.keyData.rx * 58 - props.keyData.x * (baseKeyWidth.value + keyGap)
  const y = props.keyData.ry * 58 - props.keyData.y * (baseKeyWidth.value + keyGap)
  return `${x}px ${y}px` // return "xpx ypx"
})

const keyColor = computed(() => {
  if (userSettings.value.reduceKeymapColors) return undefined
  if (mainLabel.value && mainLabel.value.layer && props.keyData.keyboard) {
    if (props.keyData.keyboard.layers[mainLabel.value.layer]) {
      return props.keyData.keyboard.layers[mainLabel.value.layer].color
    }
  } else if (mainLabel.value && mainLabel.value.action === 'MT') {
    return '#592424'
  }
  return undefined
})
const keyColorDark = computed(() => {
  if (keyColor.value) {
    return chroma(keyColor.value).darken(2).hex()
  }
  return undefined
})
const layerName = computed(() => {
  if (!props.keyData.keyboard) return ''
  if (!mainLabel.value.layer) return ''
  const layer = props.keyData.keyboard.layers[mainLabel.value.layer]
  return layer ? layer.name : ''
})

const encoderActionA = computed(() => {
  // get encoder index then lookup current keycode
  if (!props.keyData.getEncoderLabel) return
  return renderLabel(props.keyData.getEncoderLabel().a).action
})

const encoderActionB = computed(() => {
  // get encoder index then lookup current keycode
  if (!props.keyData.getEncoderLabel) return
  return renderLabel(props.keyData.getEncoderLabel().b).action
})

const isSimple = computed(() => {
  if (typeof props.keyData.encoderIndex === 'number') return false
  return mainLabel.value.simple
})

const keyElem = ref<VNodeRef | null>(null)
const fixLabelWidth = () => {
  // key is eventually hidden with a layout variant
  if (!keyElem.value) return
  const label = keyElem.value.querySelector('.keylabel-main')
  const labels = keyElem.value.querySelector('.keylabels')
  if (label) {
    console.log('fixing label width')
    label.style.transform = `scale(1)`
    const labelWidth = label.getBoundingClientRect().width
    const wrapperWidth = labels.getBoundingClientRect().width
    const scaling = Math.min(wrapperWidth / labelWidth, 1)
    label.style.transform = `scale(${scaling})`
  }
}
watch(mainLabel, async () => {
  console.log('watching cap layer')
  await nextTick()
  fixLabelWidth()
})
onMounted(() => {
  fixLabelWidth()
})

const handleKeyClick = (e: MouseEvent) => {
  if (props.mode === 'static') return
  
  console.log('Key clicked:', props.keyIndex)
  const id = props.keyIndex
  
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    if (selectedKeys.value.has(id)) {
      selectedKeys.value.delete(id)
    } else {
      selectedKeys.value.add(id)
    }
  } else {
    selectedKeys.value.clear()
    selectedKeys.value.add(id)
  }
}
</script>

<style lang="scss" scoped>
.keyborder {
  // outer key outline and background
  background-image: url('../assets/keycaptophighlight.png');
  background-repeat: repeat-x;
  position: absolute;
  width: 54px;
  height: 54px;
  cursor: pointer;
  z-index: 0;
  border-radius: 10px;
  .encoder & {
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }
  .selected & {
    border-color: white;
    z-index: 4;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 1);
  }
}
.encoder-labels {
  position: absolute;
  top: 2px;
  z-index: 10;
  & > div {
    //background: #646464;
    line-height: 15px;
  }
}
.keyborder-blocker {
  position: absolute;
  width: 52px;
  height: 52px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 5;
}
.keytop {
  position: absolute;
  height: 42px;
  width: calc(100% - 2px);
  left: 1px;
  top: 4px;
  right: 1px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 6;
  .encoder & {
    border-radius: 50%;
  }
  .selected.encoder & {
    border-bottom: 1px solid white;
  }
  
  /* Smooth movement */
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.1s ease;
}
.keylabels {
  position: absolute;
  pointer-events: none;
  width: calc(100% - 12px);
  left: 6px;
  top: 4px;
  right: 6px;
  line-height: 1rem;
  //z-index: 3;
  z-index: 7;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}
.keylabel {
  position: absolute;
  width: 100%;
  height: 100%; //calc(48px - 5px);
  
  &-center {
    flex-wrap: wrap;
  }
  .arg-top {
    text-align: center;
    position: absolute;
    top: 0px;
    left: 6px;
    right: 6px;
    font-size: 10px;
  }
  .arg-bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    text-align: center;
    position: absolute;
    //border: 1px solid #666;
    left: 6px;
    right: 6px;
    bottom: 2px;
    height: 28px;
    pointer-events: all;
    cursor: pointer;
    &.selected {
      border-color: white;
    }
  }
}
.keycap {
  position: absolute;
  .dragging & {
    transition: all 0.08s ease-out;
  }
  &.is-trns {
    opacity: 0.3;
  }
  
  /* 3D Press Interaction */
  &:hover .keytop {
    transform: translateY(2px);
  }
  &:hover .keylabel-action,
  &:hover .keylabels {
      transform: translateY(2px);
  }
}
//.keycap {
//  width: 50px;
//  height: 50px;
//  position: absolute;
//  background: #333;
//  @apply rounded;
//  &::after{
//    @apply absolute;
//    background: #red;
//    width: 100px;
//    height: 100px;
//    content: '';
//  }
//}
</style>
<style lang="scss">
.keylabel {
  font-weight: bold;
  font-size: 18px;
  //text-shadow: 1px 2px 6px rgba(0, 0, 0, 0.6);
  i.mdi {
    font-size: 18px;
  }
}
.keylabel-main {
  white-space: nowrap;
  .has-args & {
    i.mdi {
      font-size: 14px;
    }
  }
}
.keylabel-lower {
  font-size: 10px;
  font-weight: bold;
  font-style: italic;
  width: 100%;
  i.mdi {
    font-size: 12px;
  }
}
.keylabel-action {
  font-size: 10px;
  font-weight: bold;
  //font-style: italic;
  width: 100%;
  position: absolute;
  z-index: 10;
  text-align: center;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
