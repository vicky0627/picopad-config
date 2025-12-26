<template>
  <div class="mt-8">
    <div class="mb-4">
      <p class="mb-2 text-sm">Name</p>
      <input v-model="keyboardStore.name" type="text" class="input input-bordered w-full" />
    </div>
    <div class="mb-4">
      <p class="mb-2 text-sm">Manufacturer (optional)</p>
      <input v-model="keyboardStore.manufacturer" type="text" class="input input-bordered w-full" />
    </div>
    <div class="mb-4">
      <p class="mb-2 text-sm">Description (optional)</p>
      <textarea
        v-model="keyboardStore.description"
        type="text"
        class="textarea textarea-bordered w-full"
      />
    </div>
    <div class="mb-4">
      <p class="mb-2 text-sm">Tags (optional)</p>
      <VueMultiselect
        v-model="keyboardStore.tags"
        :options="keyboardTags"
        :multiple="true"
        :taggable="true"
        class="w-full"
        @tag="addTag"
      >
      </VueMultiselect>
    </div>
    
    <div class="mb-4">
      <p class="mb-2 text-sm">Keyboard Features</p>
      <VueMultiselect
        v-model="keyboardStore.kbFeatures"
        :options="availableFeatures"
        :multiple="true"
        class="w-full"
      >
        <template #option="{ option }">
          <span>{{ formatFeatureName(option) }}</span>
        </template>
      </VueMultiselect>
    </div>

    <div class="mt-8 flex justify-center">
      <button v-if="initialSetup" class="btn btn-primary" @click="$emit('next')">next</button>
    </div>

    <!-- Configuration Management -->
    <div class="divider"></div>
    <div class="mb-4">
      <h3 class="text-lg font-bold mb-2">Configuration Management</h3>
      <div class="flex flex-col gap-2">
         <div class="flex justify-between items-center bg-base-300 p-2 rounded">
           <span>App Version: {{ appVersion }}</span>
           <!-- Placeholder for Config Version if we had one stored -->
         </div>
         <div class="flex gap-2 mt-2">
           <button class="btn" @click="handleExport"><i class="mdi mdi-download mr-2"></i>Export Config</button>
           <button class="btn" @click="triggerImport"><i class="mdi mdi-upload mr-2"></i>Import Config</button>
           <input
             ref="fileInputRef"
             type="file"
             accept=".json"
             class="hidden"
             @change="handleImport"
           />
         </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { keyboardStore } from '../store'
import VueMultiselect from 'vue-multiselect'
import { ref } from 'vue'

// @ts-ignore
import { version } from '../../../../package.json'

defineProps(['initialSetup'])
const keyboardTags = ['65%']
const appVersion = version
const fileInputRef = ref<HTMLInputElement | null>(null)

const handleExport = () => {
  const data = JSON.stringify(keyboardStore.serialize(), null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pog-config-${keyboardStore.name || 'keyboard'}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const triggerImport = () => {
  fileInputRef.value?.click()
}

const handleImport = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string)
      if (confirm('Importing will overwrite your current configuration. This cannot be undone. Continue?')) {
        // preserve path/drive info
        keyboardStore.import({
          path: keyboardStore.path || '',
          configContents: json,
          folderContents: keyboardStore.driveContents,
          serial: keyboardStore.usingSerial
        })
        alert('Configuration imported successfully.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to parse (invalid JSON).')
    }
    // reset input
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
  reader.readAsText(file)
}

const addTag = (tag: string) => {
  console.log(tag)
  keyboardStore.tags.push(tag)
}

const availableFeatures = [
  'basic',
  'serial',
  'oneshot',
  'tapdance',
  'holdtap',
  'mousekeys',
  'combos',
  'macros',
  'capsword',
  'international'
]

const formatFeatureName = (feature: string) => {
  return feature.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style lang="postcss">
@import 'vue-multiselect/dist/vue-multiselect.css';
.multiselect__tags {
  width: 100%;
  background: transparent;
  border: none;
}
.multiselect__input, .multiselect__single {
  background: transparent;
  @apply text-base-content;
}
.multiselect__content-wrapper {
  @apply bg-base-200 border-base-content/10;
}
.multiselect__placeholder {
  background: transparent;
  @apply text-base-content/50;
}
.multiselect__option--selected.multiselect__option {
  @apply bg-primary text-primary-content;
}
.multiselect__option {
  @apply bg-base-200 text-base-content;
}
.multiselect__option:hover {
  @apply bg-base-300;
}
.multiselect__option--highlight {
  @apply bg-primary/20 text-base-content;
}
.multiselect__option--highlight::after {
  @apply bg-transparent;
}
</style>
