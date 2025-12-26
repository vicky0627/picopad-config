<template>
  <div class="flex items-center gap-2">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-sm btn-ghost gap-2 normal-case">
        <i class="mdi mdi-account-cog"></i>
        {{ activeProfileName }}
        <i class="mdi mdi-chevron-down"></i>
      </label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
        <li class="menu-title">
          <span>Switch Profile</span>
        </li>
        <li v-for="profile in profiles" :key="profile.id">
          <a 
            :class="{ 'active': profile.id === activeProfileId }"
            @click="switchProfile(profile.id)"
          >
            {{ profile.name }}
          </a>
        </li>
        <div class="divider my-1"></div>
        <li><a @click="openAddModal"><i class="mdi mdi-plus"></i> New Profile</a></li>
        <li><a @click="duplicateCurrentProfile"><i class="mdi mdi-content-copy"></i> Duplicate Current</a></li>
        <li><a @click="openRenameModal"><i class="mdi mdi-pencil"></i> Rename Current</a></li>
        <li :class="{ 'disabled': profiles.length <= 1 }">
          <a @click="deleteCurrentProfile" :class="{ 'text-error': profiles.length > 1 }">
            <i class="mdi mdi-delete"></i> Delete Current
          </a>
        </li>
      </ul>
    </div>

    <!-- Add/Rename Modal -->
    <BaseModal
      :open="showNameModal"
      :title="modalMode === 'add' ? 'Create New Profile' : 'Rename Profile'"
      :confirm-text="modalMode === 'add' ? 'Create' : 'Rename'"
      @close="closeNameModal"
      @confirm="handleNameConfirm"
    >
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Profile Name</span>
        </label>
        <input
          v-model="profileNameInput"
          type="text"
          placeholder="e.g. Gaming, Office"
          class="input input-bordered w-full"
          @keyup.enter="handleNameConfirm"
        />
      </div>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal
      :open="showDeleteModal"
      title="Delete Profile?"
      confirm-text="Delete"
      cancel-text="Cancel"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    >
      <p>Are you sure you want to delete the profile <strong>{{ activeProfileName }}</strong>?</p>
      <p class="text-sm text-opacity-70 mt-2">This action cannot be undone.</p>
    </BaseModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { keyboardStore } from '../store'
import BaseModal from './BaseModal.vue'

const profiles = computed(() => keyboardStore.profiles)
const activeProfileId = computed(() => keyboardStore.activeProfileId)
const activeProfileName = computed(() => {
  const profile = profiles.value.find(p => p.id === activeProfileId.value)
  return profile ? profile.name : 'Unknown'
})

const showNameModal = ref(false)
const showDeleteModal = ref(false)
const modalMode = ref<'add' | 'rename'>('add')
const profileNameInput = ref('')

const switchProfile = (id: string) => {
  if (id === activeProfileId.value) return
  keyboardStore.activateProfile(id)
  // Close dropdown (helper for daisyUI dropdowns behavior if needed, usually clicking closes it)
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

const openAddModal = () => {
  modalMode.value = 'add'
  profileNameInput.value = ''
  showNameModal.value = true
}

const openRenameModal = () => {
  modalMode.value = 'rename'
  profileNameInput.value = activeProfileName.value
  showNameModal.value = true
}

const duplicateCurrentProfile = () => {
  if (activeProfileId.value) {
    keyboardStore.duplicateProfile(activeProfileId.value)
  }
}

const deleteCurrentProfile = () => {
  if (profiles.value.length <= 1) return
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (activeProfileId.value) {
    keyboardStore.removeProfile(activeProfileId.value)
  }
  showDeleteModal.value = false
}

const closeNameModal = () => {
  showNameModal.value = false
  profileNameInput.value = ''
}

const handleNameConfirm = () => {
  if (!profileNameInput.value.trim()) return

  if (modalMode.value === 'add') {
    const newProfile = keyboardStore.addProfile(profileNameInput.value)
    keyboardStore.activateProfile(newProfile.id)
  } else {
    if (activeProfileId.value) {
      keyboardStore.renameProfile(activeProfileId.value, profileNameInput.value)
    }
  }
  closeNameModal()
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
