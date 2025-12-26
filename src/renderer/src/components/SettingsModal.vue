<template>
  <BaseModal
    :open="open"
    title="Settings"
    cancel-text="Close"
    :show-confirm="false"
    @close="$emit('close')"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="font-bold text-sm text-base-content/70 uppercase tracking-wider">Application</label>
        <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-content/10">
          <div class="flex items-center gap-3">
            <img src="@renderer/assets/icon.png" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-bold">Picopad Configuration Suite</p>
              <p class="text-xs text-base-content/60">Version 1.0.0</p>
            </div>
          </div>
          <a
            href="https://github.com/vicky0627/picopad-config/releases/latest/download/Picopad-v1-Setup.exe"
            target="_blank"
            class="btn btn-sm btn-secondary text-white shadow-lg shadow-secondary/30"
          >
            <i class="mdi mdi-download mr-1"></i>
            Download App
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-bold text-sm text-base-content/70 uppercase tracking-wider">Appearance</label>
        
        <!-- Theme Toggle -->
        <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-content/10">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-theme-light-dark text-lg"></i>
            <span>Dark Mode</span>
          </div>
          <input type="checkbox" class="toggle toggle-primary" 
            :checked="settingsStore.theme === 'picopad'" 
            @change="settingsStore.theme = settingsStore.theme === 'picopad' ? 'picopad-light' : 'picopad'" />
        </div>

        <!-- Reduced Colors Toggle -->
        <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-content/10 mt-2">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-palette-swatch-outline text-lg"></i>
            <span>Simple Key Colors</span>
          </div>
          <input type="checkbox" class="toggle toggle-primary" v-model="userSettings.reduceKeymapColors" />
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-bold text-sm text-base-content/70 uppercase tracking-wider">Workflow</label>
        
        <!-- Auto Select Next -->
        <div class="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-content/10">
          <div class="flex items-center gap-2">
            <i class="mdi mdi-arrow-right-bold-circle-outline text-lg"></i>
            <span>Auto-select Next Key</span>
          </div>
          <input type="checkbox" class="toggle toggle-primary" v-model="userSettings.autoSelectNextKey" />
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <label class="font-bold text-sm text-base-content/70 uppercase tracking-wider">About</label>
        <p class="text-sm text-base-content/80 text-justify">
          The Picopad Configuration Suite allows you to easily customize your Picopad keyboard. 
          Use the Configurator to remap keys, manage layers, and adjust settings. 
          Use the Key Tester to verify your switches.
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { settingsStore } from '../store/settings'
import { userSettings } from '../store'

defineProps<{
  open: boolean
}>()

defineEmits<{
  close: []
}>()
</script>
