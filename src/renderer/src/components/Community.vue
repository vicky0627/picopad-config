<template>
  <div>
    <!-- Web3 wallet integration disabled in web version -->
    <div v-if="false">
      <w3m-core-button label="Login"></w3m-core-button>
      <div v-if="accountAddress">
        {{ renderedAccountAddress }}
        <div class="btn" @click="sign">sign</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Web3 modal disabled for web version - not needed for keyboard configuration
// import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/html'
// import { configureChains, createClient, signMessage } from '@wagmi/core'
// import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'
// import { watchAccount } from '@wagmi/core'
import { computed, ref } from 'vue'

// Disabled Web3 functionality
const accountAddress = ref('')
const renderedAccountAddress = computed(() => '')
const sign = async () => {
  console.log('Web3 disabled in web version')
}
</script>

<style lang="scss" scoped></style>
