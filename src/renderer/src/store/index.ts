import { computed, ref } from 'vue'
import VueStore from '@wlard/vue-class-store'
import { ulid } from 'ulid'
import { useRouter } from 'vue-router'
import { matrixPositionToIndex } from '../helpers'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs'

const router = useRouter()
// @ts-ignore will be used later
type KeyActions = {
  type: 'chord' | 'tap' | 'short_hold' | 'hold' | 'macro'
  keycodes: string[]
  actions: KeyActions[]
}[]

export const keyboardHistory = useStorage<any[]>('keyboardHistory', [])
export const addToHistory = (keyboard: any) => {
  console.log('saving keyboard to history', keyboard)
  // to get rid of reactivity and proxys while deepcloning // does not work with structured clone
  const keyboardData = {
    ...JSON.parse(JSON.stringify(keyboard.serialize())),
    ...(keyboard.path && { path: keyboard.path })
  }
  if (!keyboardHistory.value.find((board) => board.id === keyboard.id)) {
    keyboardHistory.value.unshift(keyboardData)
  } else {
    const index = keyboardHistory.value.findIndex((board) => board.id === keyboard.id)
    // push this version to the backups as well
    if (!keyboardHistory.value[index].backups) keyboardHistory.value[index].backups = []
    const backups = [keyboardData, ...keyboardHistory.value[index].backups].slice(0, 100)
    keyboardHistory.value[index] = {
      ...keyboardData,
      backups
    }
  }
}

// list of key indexes that are selected
export const selectedKeys = ref<Set<number>>(new Set())

// currently selected keymap layer
export const selectedLayer = ref(0)

type EncoderLayer = EncoderActions[]
type EncoderActions = [string, string, string | undefined]
export type Profile = {
  id: string
  name: string
  keymap: (string | undefined)[][]
  layers: { name: string; color: string | undefined }[]
  encoderKeymap: EncoderLayer[]
}

export type BaseKeyInfo = {
  x: number
  y: number
  x2?: number
  y2?: number
  w?: number
  h?: number
  h2?: number
  w2?: number
  r?: number
  rx?: number
  ry?: number
}
export type KeyInfo = BaseKeyInfo & {
  matrix?: [number, number]
  variant?: [number, number]
  directPinIndex?: number
  coordMapIndex?: number
  idx?: number
  encoderIndex?: number
  keyboard?: any
}

export class Key {
  id = ulid()
  x = 0
  x2?: number = undefined
  y = 0
  y2?: number = undefined
  w = 1
  w2?: number = undefined
  h = 1
  h2?: number = undefined
  r = 0
  rx = 0
  ry = 0
  matrix?: [number, number] = undefined
  coordMapIndex?: number = undefined
  encoderIndex?: number = undefined
  variant?: [number, number] = undefined
  keyboard?: any

  constructor({
    x,
    y,
    matrix,
    variant,
    h,
    w,
    x2,
    y2,
    h2,
    w2,
    r,
    rx,
    ry,
    directPinIndex, // Todo: will be removed for idx in the future
    coordMapIndex, // Todo: will also be removed for idx
    idx,
    encoderIndex,
    keyboard
  }: KeyInfo) {
    this.x = x
    this.y = y
    if (matrix && matrix.length === 2) {
      this.matrix = matrix
    }
    if (variant && variant.length === 2) {
      this.variant = variant
    }
    // coordmap things
    if (!idx && typeof directPinIndex === 'number') idx = directPinIndex
    if (typeof idx === 'number') this.coordMapIndex = idx
    if (!idx && typeof coordMapIndex === 'number') this.coordMapIndex = coordMapIndex
    if (h) this.h = h
    if (w) this.w = w
    if (h2) this.h2 = h2
    if (w2) this.w2 = w2
    if (x2) this.x2 = x2
    if (y2) this.y2 = y2
    if (r) this.r = r
    if (rx) this.rx = rx
    if (ry) this.ry = ry
    if (typeof encoderIndex === 'number') this.encoderIndex = encoderIndex
    this.keyboard = keyboard
  }

  serialize() {
    const tmpKey: KeyInfo = {
      x: this.x,
      y: this.y
    }
    if (this.w !== 1) {
      tmpKey.w = this.w
    }
    if (this.h !== 1) {
      tmpKey.h = this.h
    }
    if (this.w2) {
      tmpKey.w2 = this.w2
    }
    if (this.h2) {
      tmpKey.h2 = this.h2
    }
    if (this.x2) {
      tmpKey.x2 = this.x2
    }
    if (this.y2) {
      tmpKey.y2 = this.y2
    }
    if (this.r) {
      tmpKey.r = this.r
    }
    if (this.ry) {
      tmpKey.ry = this.ry
    }
    if (this.rx) {
      tmpKey.rx = this.rx
    }
    if (Array.isArray(this.matrix) && this.matrix.length === 2) {
      tmpKey.matrix = this.matrix.map((n) => Number(n)) as [number, number]
    }
    if (Array.isArray(this.variant) && this.variant.length === 2) {
      tmpKey.variant = this.variant.map((n) => Number(n)) as [number, number]
    }
    if (typeof this.coordMapIndex === 'number') {
      tmpKey.idx = this.coordMapIndex
    }
    if (typeof this.encoderIndex === 'number') {
      tmpKey.encoderIndex = this.encoderIndex
    }
    return tmpKey
  }

  set({}) {}

  // happity hoppety property
  delta({ property, value }: { value: number; property: keyof BaseKeyInfo }) {
    console.log('writing delta', property, value, this[property])
    if (this[property]) {
      // validate eg not less than 0 on w and h
      if (['w', 'h'].includes(property)) {
        if (this[property]! + value < 0.25) {
          return
        }
      }
      // @ts-ignore only using correct keys from type
      this[property] = this[property] + value
    } else {
      this[property] = value
    }
  }

  getKeymapIndex() {
    // if (!this.matrix && typeof this.coordMapIndex !== 'number') return undefined
    // if (this.keyboard.wiringMethod === 'matrix') {
    //   return matrixPositionToIndex({
    //     pos: this.matrix || [0,0],
    //     matrixWidth: keyboardStore.cols
    //   })
    // } else {
    return this.coordMapIndex
    // }
  }

  setOnKeymap(keyCode: string) {
    const keyIndex = this.getKeymapIndex()
    console.log('index', keyIndex, keyCode)
    if (typeof keyIndex !== 'number') return

    console.log('setting ', this.id, 'to', keyCode, 'at', keyIndex)
    if (!keyCode.includes('(')) {
      // TODO: could set this as arg in a key
      // if (
      //   currentKeyAction &&
      //   currentKeyAction.includes("(") &&
      //   selectedKey.value.args
      // ) {
      //   // Validate for what args this function takes
      //   // only set this as arg
      //   // TODO: handle multiple args
      //   let action = currentKeyAction.split("(")[0].replace(")", "");
      //   keymap.value[selectedLayer.value][keyIndex] =
      //     action + "(" + keyCode + ")";
      //   return;
      // }
    }
    keyboardStore.keymap[selectedLayer.value][keyIndex] = keyCode
  }

  getMatrixLabel() {
    if (typeof this.coordMapIndex === 'number') return this.coordMapIndex
    if (this.matrix) {
      if (
        typeof this.matrix[0] === 'number' &&
        !isNaN(this.matrix[0]) &&
        typeof this.matrix[1] === 'number' &&
        !isNaN(this.matrix[1])
      )
        return `${this.matrix[0]} - ${this.matrix[1]}`
      if (typeof this.matrix[0] === 'number' && !isNaN(this.matrix[0]))
        return `${this.matrix[0]} - X`
      if (typeof this.matrix[1] === 'number' && !isNaN(this.matrix[1]))
        return `X - ${this.matrix[1]}`
    }
    return ''
  }

  getEncoderLabel() {
    if (typeof this.encoderIndex !== 'number') return { a: '', b: '', s: '' }
    return {
      a: this.keyboard.encoderKeymap[0][this.encoderIndex][0],
      b: this.keyboard.encoderKeymap[0][this.encoderIndex][1],
      s: this.keyboard.encoderKeymap[0][this.encoderIndex][2]
    }
  }
}

export type RgbOptions = {
  animationMode: number
  hueDefault: number
  satDefault: number
  valDefault: number
  animationSpeed: number
  breatheCenter: number
  knightEffectLength: number
}

export class Keyboard {
  id = ulid()
  path?: string = undefined
  name = ''
  manufacturer = ''
  tags: string[] = []
  description = ''

  // serial interface
  port?: string = undefined // only set when serial is available
  usingSerial = false
  serialNumber = ''
  serialPortA?: string = undefined // Port with lower number
  serialPortB?: string = undefined // Port with higher number

  driveConnected = false
  driveContents: string[] = []

  //manage the code.py yourself
  flashingMode: 'automatic' | 'manual' = 'automatic'

  pogConfigured = false
  firmwareInstalled = false

  // layout
  keys: Key[] = []
  // Layout options
  layouts: { name: string; variants: string[]; selected: number }[] = []
  coordMap: string[][] = []
  // wiring

  controller = ''
  diodeDirection: 'ROW2COL' | 'COL2ROW' = 'COL2ROW'
  wiringMethod: 'matrix' | 'direct' = 'matrix'
  rows = 1
  cols = 1
  pins = 1
  rowPins: string[] = []
  colPins: string[] = []
  directPins: string[] = []
  coordMapSetup = false

  rgbPin = ''
  rgbNumLeds = 0
  rgbOptions: RgbOptions = {
    animationMode: 0,
    hueDefault: 0,
    satDefault: 255,
    valDefault: 255,
    animationSpeed: 1,
    breatheCenter: 1,
    knightEffectLength: 3
  }

  pinPrefix: 'board' | 'gp' | 'none' | 'quickpin' = 'gp'
  // features

  encoders: { pad_a: string; pad_b: string }[] = []

  // split features
  keyboardType: 'normal' | 'splitBLE' | 'splitSerial' | 'splitOnewire' = 'normal'
  splitSide: 'left' | 'right' | 'vbus' | 'label' = 'left'
  // split = false
  splitPinA = ''
  splitPinB = ''
  vbusPin = 'VBUS_SENSE'
  splitUsePio = true
  splitFlip = false
  splitUartFlip = false

  // keymaps

  // layer > encoder index > encoder action index > keycode
  encoderKeymap: EncoderLayer[] = []
  keymap: (string | undefined)[][] = [[]]
  layers: { name: string; color: string | undefined }[] = []

  // profiles
  profiles: Profile[] = []
  activeProfileId?: string = undefined

  kbFeatures = [
    'basic',
    'serial',
    'oneshot',
    'tapdance',
    'holdtap',
    'mousekeys',
    'combos',
    'macros'
  ]

  constructor() {}

  // Keys
  setKeys(keys: KeyInfo[]) {
    this.keys = []
    if (!keys || keys.length === 0) return
    keys.forEach((key) => {
      const tmpKey = new Key({ ...key, keyboard: this })
      this.keys.push(tmpKey)
    })
  }

  getKeys() {
    return this.keys.map((key) => key.serialize())
  }

  addKey(key: any) {
    this.keys.push(new Key({ ...key, keyboard: this }))
  }

  removeKeys({ ids }: { ids: string[] }) {
    this.keys = this.keys.filter((a) => !ids.includes(a.id))
  }

  deltaForKeys({
    keyIndexes,
    property,
    value
  }: {
    keyIndexes: number[]
    property: keyof BaseKeyInfo
    value: number
  }) {
    keyIndexes.forEach((keyIndex) => {
      this.keys[keyIndex].delta({ property, value })
    })
  }

  hasFile(filename: string) {
    return this.driveContents.includes(filename)
  }

  isSplit() {
    return this.keyboardType !== 'normal'
  }

  // count keys on the matrix
  physicalKeyCount() {
    let keycount = 0
    if (this.wiringMethod === 'matrix') {
      keycount = this.rows * this.cols
    } else {
      keycount = this.pins
    }
    if (this.isSplit()) {
      keycount = keycount * 2
    }
    return keycount
  }

  // count keys in the layout (including variant keys so duplicate physical keys)
  keyCount() {
    return this.keys.length
  }

  getMatrixWidth() {
    let width = 0
    if (this.wiringMethod === 'matrix') {
      width = this.cols
    } else {
      width = this.pins
    }
    if (this.isSplit()) {
      width = width * 2
    }
    return width
  }

  // get keymap index for matrix pos of a key
  getKeymapIndexForKey({ key }: { key: any }) {
    const keyIndex = matrixPositionToIndex({
      pos: key.matrix,
      matrixWidth: this.getMatrixWidth()
    })
    return keyIndex
  }

  getActionForKey({ key, layer }: { key: any; layer: number }) {
    if (!this.keymap[layer]) return 'No layer'
    const keyCode = this.keymap[layer][key.getKeymapIndex()]
    // resolve readable character
    if (!keyCode || keyCode === 'KC.TRNS') return '▽'
    return keyCode
  }

  import({
    path,
    configContents,
    folderContents,
    serial
  }: {
    path: string
    codeContents?: string
    configContents: any
    folderContents: string[]
    serial?: boolean
  }) {
    this.clear()
    this.id = ulid()
    this.path = path
    this.driveContents = folderContents
    this.usingSerial = serial === true
    this.pogConfigured = this.hasFile('pog.json')
    this.firmwareInstalled = this.hasFile('kmk')
    if (this.pogConfigured) {
      console.log('pog.json exists, importing keyboard features')
      this.setKeys(configContents.keys)

      if (configContents.id) this.id = configContents.id
      if (configContents.name) this.name = configContents.name
      if (configContents.description) this.description = configContents.description
      if (configContents.tags) this.tags = configContents.tags
      if (configContents.manufacturer) this.manufacturer = configContents.manufacturer
      if (configContents.keyboardType) this.keyboardType = configContents.keyboardType
      this.wiringMethod = configContents.wiringMethod || 'matrix'
      this.flashingMode = configContents.flashingMode || 'automatic'
      this.pinPrefix = configContents.pinPrefix || 'gp'
      this.coordMapSetup = configContents.coordMapSetup || false

      if (configContents.coordMap) this.coordMap = configContents.coordMap
      if (configContents.rows) this.rows = configContents.rows
      if (configContents.cols) this.cols = configContents.cols
      if (configContents.pins) this.pins = configContents.pins
      if (configContents.rowPins) this.rowPins = configContents.rowPins
      if (configContents.colPins) this.colPins = configContents.colPins
      if (configContents.diodeDirection) this.diodeDirection = configContents.diodeDirection
      if (configContents.directPins) this.directPins = configContents.directPins
      if (configContents.controller) this.controller = configContents.controller
      if (configContents.keymap) this.keymap = configContents.keymap
      if (configContents.layouts) this.layouts = configContents.layouts
      if (configContents.layers) this.layers = configContents.layers

      if (configContents.splitPinA) this.splitPinA = configContents.splitPinA
      if (configContents.splitPinB) this.splitPinB = configContents.splitPinB
      if (configContents.splitSide) this.splitSide = configContents.splitSide
      if (configContents.vbusPin) this.vbusPin = configContents.vbusPin
      if (configContents.splitUsePio) this.splitUsePio = configContents.splitUsePio
      if (configContents.splitFlip) this.splitFlip = configContents.splitFlip
      if (configContents.splitUartFlip) this.splitUartFlip = configContents.splitUartFlip

      // encoders
      if (configContents.encoders) this.encoders = configContents.encoders
      if (configContents.encoderKeymap) this.encoderKeymap = configContents.encoderKeymap

      //RGB
      if (configContents.rgbPin) this.rgbPin = configContents.rgbPin
      if (configContents.rgbNumLeds) this.rgbNumLeds = Number(configContents.rgbNumLeds)
      if (configContents.rgbOptions) this.rgbOptions = configContents.rgbOptions

      if (configContents.kbFeatures) this.kbFeatures = configContents.kbFeatures
      
      // profiles
      if (configContents.profiles) {
        this.profiles = configContents.profiles
        this.activeProfileId = configContents.activeProfileId
      } else {
        // Migration: If no profiles exist but we have content, create a default profile
        // This ensures backward compatibility while enabling new features
        const defaultProfile: Profile = {
          id: ulid(),
          name: 'Default',
          keymap: this.keymap,
          layers: this.layers,
          encoderKeymap: this.encoderKeymap
        }
        this.profiles = [defaultProfile]
        this.activeProfileId = defaultProfile.id
      }
    }
  }

  clear() {
    this.pogConfigured = false
    this.path = ''
    this.coordMap = []
    this.layers = []
    this.name = ''
    this.description = ''
    this.tags = []
    this.manufacturer = ''
    this.keyboardType = 'normal'
    this.wiringMethod = 'matrix'
    this.flashingMode = 'automatic'
    this.pinPrefix = 'gp'
    this.coordMapSetup = false
    this.rows = 1
    this.cols = 1
    this.pins = 1
    this.rowPins = []
    this.colPins = []
    this.directPins = []
    this.diodeDirection = 'COL2ROW'
    this.controller = ''
    this.keymap = []
    this.layouts = []
    this.encoders = []
    this.encoderKeymap = []
    this.rgbPin = ''
    this.rgbNumLeds = 0
    this.rgbOptions = {
      animationMode: 0,
      hueDefault: 0,
      satDefault: 255,
      valDefault: 255,
      animationSpeed: 1,
      breatheCenter: 1,
      knightEffectLength: 3
    }
    // split pins
    this.splitPinA = ''
    this.splitPinB = ''
    this.splitSide = 'left'
    this.vbusPin = 'VBUS_SENSE'
    this.splitUsePio = true
    this.splitFlip = false
    this.splitUartFlip = false
    this.serialNumber = ''
    this.profiles = []
    this.activeProfileId = undefined
  }

  // Profile Management
  addProfile(name: string) {
    const newProfile: Profile = {
      id: ulid(),
      name,
      keymap: JSON.parse(JSON.stringify(this.keymap)), // Clone current keymap or empty? Let's clone current as a starting point
      layers: JSON.parse(JSON.stringify(this.layers)),
      encoderKeymap: JSON.parse(JSON.stringify(this.encoderKeymap))
    }
    this.profiles.push(newProfile)
    return newProfile
  }

  removeProfile(id: string) {
    if (this.profiles.length <= 1) return // Cannot delete last profile
    this.profiles = this.profiles.filter(p => p.id !== id)
    if (this.activeProfileId === id) {
      this.activateProfile(this.profiles[0].id)
    }
  }

  activateProfile(id: string) {
    const profile = this.profiles.find(p => p.id === id)
    if (!profile) return
    
    // Save current state to old profile before switching? 
    // Usually explicit save is better, but 'switching profiles' might imply saving the previous one.
    // However, the task says 'Switching profiles must NOT auto-flash firmware'.
    // It doesn't prohibit updating the in-memory store.
    if (this.activeProfileId) {
      this.updateProfile(this.activeProfileId)
    }

    this.activeProfileId = id
    this.keymap = JSON.parse(JSON.stringify(profile.keymap))
    this.layers = JSON.parse(JSON.stringify(profile.layers))
    this.encoderKeymap = JSON.parse(JSON.stringify(profile.encoderKeymap))
    
    // Trigger reactivity if needed (Vue refs should handle it if this.keymap is replaced)
  }
  
  updateProfile(id: string) {
    const index = this.profiles.findIndex(p => p.id === id)
    if (index === -1) return
    this.profiles[index] = {
      ...this.profiles[index],
      keymap: JSON.parse(JSON.stringify(this.keymap)),
      layers: JSON.parse(JSON.stringify(this.layers)),
      encoderKeymap: JSON.parse(JSON.stringify(this.encoderKeymap))
    }
  }

  renameProfile(id: string, newName: string) {
    const profile = this.profiles.find(p => p.id === id)
    if (profile) profile.name = newName
  }

  duplicateProfile(id: string) {
    const profile = this.profiles.find(p => p.id === id)
    if (!profile) return
    const newProfile = {
      ...JSON.parse(JSON.stringify(profile)),
      id: ulid(),
      name: `${profile.name} Copy`
    }
    this.profiles.push(newProfile)
  }

  serialize() {
    // Ensure active profile is up to date before serializing
    if (this.activeProfileId) {
      this.updateProfile(this.activeProfileId)
    }
    return {
      id: this.id,
      name: this.name,
      manufacturer: this.manufacturer,
      description: this.description,
      tags: this.tags,
      controller: this.controller,
      keyboardType: this.keyboardType,

      wiringMethod: this.wiringMethod,
      diodeDirection: this.wiringMethod == 'matrix' ? this.diodeDirection : '',
      rows: this.wiringMethod == 'matrix' ? this.rows : 0,
      cols: this.wiringMethod == 'matrix' ? this.cols : 0,
      pins: this.wiringMethod == 'direct' ? this.pins : 0,

      rowPins: this.wiringMethod == 'matrix' ? this.rowPins : [],
      colPins: this.wiringMethod == 'matrix' ? this.colPins : [],
      directPins: this.wiringMethod == 'direct' ? this.directPins : [],

      encoders: this.encoders,

      layouts: this.layouts,
      keys: this.getKeys(),

      keymap: this.keymap,
      encoderKeymap: this.encoderKeymap,
      layers: this.layers,

      split: this.keyboardType !== 'normal',
      splitPinA: this.splitPinA,
      splitPinB: this.splitPinB,
      splitSide: this.splitSide,
      vbusPin: this.vbusPin,
      splitUsePio: this.splitUsePio,
      splitFlip: this.splitFlip,
      splitUartFlip: this.splitUartFlip,

      coordMap: this.coordMap,
      pinPrefix: this.pinPrefix,
      coordMapSetup: this.coordMapSetup,

      rgbPin: this.rgbPin,
      rgbNumLeds: this.rgbNumLeds,
      rgbOptions: this.rgbOptions,

      kbFeatures: this.kbFeatures,

      profiles: this.profiles,
      activeProfileId: this.activeProfileId,

      flashingMode: this.flashingMode,
      lastEdited: dayjs().format('YYYY-MM-DD HH:mm')
    }
  }
}

@VueStore
export class KeyboardStore extends Keyboard {}

export const keyboardStore = new KeyboardStore()

// [0,2,3] index of array is the selected layout and the value its option
export const selectedVariants = ref<number[]>([])
export const layoutVariants = ref<(string | string[])[]>([])

export const isNewKeyboardSetup = computed(() => {
  if (router) return router.currentRoute.value.path.startsWith('/setup-wizard')
  return false
})

export const notifications = ref<{ label: string }[]>([])

export const pinPrefixHint = computed(() => {
  switch (keyboardStore.pinPrefix) {
    case 'gp':
      return 'Generates `board.GP1` like pins from numbers'
      break
    case 'board':
      return 'Generates `board.yourpin` like pins from text'
      break
    case 'none':
      return 'Generates `yourpin` like pins from text'
      break
    case 'quickpin':
      return 'Generates `pins[1]` like pins from numbers'
    default:
      return ''
  }
})

export const splitSideHint = computed(() => {
  switch (keyboardStore.splitSide) {
    case 'label':
      return 'Detects split side by label on the microcontroller'
      break
    case 'vbus':
      return 'Detects split side using VBUS pin'
      break
    case 'left':
      return 'Detects split side using value in config file (left side)'
      break
    case 'right':
      return 'Detects split side using value in config file (right side)'
      break
    default:
      return ''
  }
})

export const splitPinHint = computed(() => {
  switch (keyboardStore.keyboardType) {
    case 'splitSerial':
      return 'Defines the serial pins used to connect the two halves.'
      break
    case 'splitOnewire':
      return 'Defines the data pin used to connect the two halves'
      break
    default:
      return ''
  }
})

export const vbusPinHint = computed(() => {
  return `Generates 'board.${keyboardStore.vbusPin}'`
})

export const userSettings = useStorage('user-settings', {
  reduceKeymapColors: false,
  autoSelectNextKey: false
})

export const serialKeyboards = ref<any[]>([])
