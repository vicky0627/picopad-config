<template>
  <div class="w-full max-w-4xl mx-auto pb-24">
    <!-- Header -->
    <div class="mb-8 animate-enter">
      <h1 class="text-4xl font-bold text-primary mb-2">User Manual</h1>
      <p class="text-gray-400 text-lg">Comprehensive guide to customizing your Picopad Pro.</p>
    </div>

    <!-- Overview -->
    <section class="mb-12 glass-panel spring-hover p-6 rounded-xl animate-enter delay-100">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <i class="mdi mdi-information-outline text-primary"></i> Overview
      </h2>
      <div class="space-y-4 text-gray-300">
        <p>
          <strong>Picopad Configurator</strong> is a premium, web-based tool designed to effortlessly customize your Picopad Pro mechanical keyboard. Inspired by the POG project and built on top of the KMK firmware ecosystem, it offers a visual interface to remap keys, create macros, manage layers, and adjust settings without writing a single line of code.
        </p>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="mb-12 animate-enter delay-200">
      <h2 class="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <i class="mdi mdi-rocket-launch text-secondary"></i> Getting Started
      </h2>
      <div class="grid gap-6 md:grid-cols-1">
        <div class="card bg-base-200 shadow-xl spring-hover">
          <div class="card-body">
            <h3 class="card-title text-lg mb-2">1. Connect Your Keyboard</h3>
            <p>Plug your Picopad keyboard into your computer via USB. Ensure the cable supports data transfer.</p>
          </div>
        </div>
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-lg mb-2">2. Open the Configurator</h3>
            <p>Navigate to <span class="text-primary font-mono">https://picopad-config.web.app</span> in a Chrome-based browser (Chrome, Edge, Opera) for the best compatibility with WebUSB/WebSerial.</p>
          </div>
        </div>
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-lg mb-2">3. Detect Keyboard</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li>Click <strong>"Add existing Picopad keyboard"</strong>.</li>
              <li>Select the drive corresponding to your keyboard (usually labeled <code class="badge badge-neutral font-mono">CIRCUITPY</code>).</li>
              <li>The dashboard will load your current configuration.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Features & How-to -->
    <section class="mb-12 animate-enter delay-300">
      <h2 class="text-2xl font-bold mb-6 text-white flex items-center gap-2">
        <i class="mdi mdi-tools text-accent"></i> Features & How-to
      </h2>

      <!-- Key Mapping -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" checked /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-keyboard mr-2"></i> Key Mapping
        </div>
        <div class="collapse-content">
          <p class="mb-4">Customizing your key layout is the core feature.</p>
          <ol class="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong>Select a Key</strong>: Click any key on the visual representation of your keyboard.</li>
            <li><strong>Choose a Function</strong>: The <strong>Key Picker</strong> panel will appear at the bottom.</li>
            <li><strong>Categories</strong>:
              <ul class="list-disc list-inside pl-6 mt-2 space-y-1">
                <li><strong>Basic</strong>: Standard letters, numbers, and symbols.</li>
                <li><strong>Layers</strong>: Layer switching keys (MO, TO, TG).</li>
                <li><strong>KMK</strong>: Special firmware commands (Reset, Reload).</li>
                <li><strong>Media</strong>: Volume control, Play/Pause, Brightness.</li>
                <li><strong>RGB</strong>: Lighting controls (Hue, Saturation, Animation modes).</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <!-- Shortcut Builder -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-apple-keyboard-command mr-2"></i> Shortcut Builder
        </div>
        <div class="collapse-content">
          <p class="mb-4">Create complex key combinations (e.g., <kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">Shift</kbd> + <kbd class="kbd kbd-sm">T</kbd>) easily.</p>
          <ol class="list-decimal list-inside space-y-2 text-gray-300">
            <li>Navigate to the <strong>Key Picker</strong>.</li>
            <li>Locate the <strong>Shortcut Builder</strong> section.</li>
            <li><strong>Toggle Modifiers</strong>: Click to enable <kbd class="kbd kbd-sm">Ctrl</kbd>, <kbd class="kbd kbd-sm">Shift</kbd>, <kbd class="kbd kbd-sm">Alt</kbd>, or <kbd class="kbd kbd-sm">Win</kbd>.</li>
            <li><strong>Select Trigger Key</strong>: Choose the main key (e.g., <kbd class="kbd kbd-sm">T</kbd>, <kbd class="kbd kbd-sm">Delete</kbd>) from the dropdown.</li>
            <li><strong>Preview</strong>: See the resulting combo.</li>
            <li><strong>Create</strong>: Click the arrow button to assign this shortcut to your selected key.</li>
          </ol>
        </div>
      </div>

      <!-- Custom Launchers -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-rocket-launch mr-2"></i> Custom Launchers
        </div>
        <div class="collapse-content">
          <p class="mb-4">Create keys that instantly launch applications or open websites.</p>
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li>Go to the <strong>Launch</strong> category in the Key Picker.</li>
            <li><strong>Custom Launcher</strong>: Enter an App Name (e.g., <code>notepad</code>, <code>calc</code>) or a URL (e.g., <code>https://google.com</code>) in the input field.</li>
            <li>Click <strong>Create Key</strong> to generate a macro key.</li>
            <li>Assign this key to your layout. When pressed, it will automatically open the Windows "Run" dialog (<kbd class="kbd kbd-sm">Win</kbd>+<kbd class="kbd kbd-sm">R</kbd>), type your command, and press Enter.</li>
          </ul>
        </div>
      </div>

      <!-- Layer Management -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-layers mr-2"></i> Layer Management
        </div>
        <div class="collapse-content">
          <ul class="list-disc list-inside space-y-2 text-gray-300 mb-4">
            <li>Picopad supports multiple layers (e.g., a base layer for typing, a second layer for navigation/media).</li>
            <li>Use layer keys (from the <strong>Layers</strong> category) to switch between them.</li>
          </ul>
          
          <div class="overflow-x-auto border border-base-content/10 rounded-lg">
            <table class="table w-full text-sm">
              <thead class="bg-base-300 text-base-content">
                <tr>
                  <th class="w-32">Key Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-base-100/50">
                  <td class="font-mono font-bold text-primary">MO(layer)</td>
                  <td class="text-gray-300"><strong>Momentary</strong>: Activates the layer only while you <em>hold</em> the key down. Essential for accessing secondary keys like arrows or F-keys efficiently.</td>
                </tr>
                <tr class="hover:bg-base-100/50">
                  <td class="font-mono font-bold text-secondary">TG(layer)</td>
                  <td class="text-gray-300"><strong>Toggle</strong>: Toggles the layer on or off with each press. Great for switching to a persistent mode like a Numpad or Gaming layer.</td>
                </tr>
                <tr class="hover:bg-base-100/50">
                  <td class="font-mono font-bold text-accent">TO(layer)</td>
                  <td class="text-gray-300"><strong>Turn On</strong>: Switches purely to the specified layer, deactivating other active layers. Best for changing base layouts (e.g., QWERTY ↔ Dvorak).</td>
                </tr>
                <tr class="hover:bg-base-100/50">
                  <td class="font-mono font-bold text-info">TT(layer)</td>
                  <td class="text-gray-300"><strong>Tap Toggle</strong>: Acts like <strong>MO</strong> (momentary) if held, but toggles on like <strong>TG</strong> if tapped multiple times (usually 3 taps).</td>
                </tr>
                <tr class="hover:bg-base-100/50">
                  <td class="font-mono font-bold text-warning">LM(layer)</td>
                  <td class="text-gray-300"><strong>Layer Mod</strong>: Momentarily switches to the layer <em>and</em> holds a modifier (like Shift or Ctrl) simultaneously.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Configuration Management -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-content-save mr-2"></i> Saving & Flashing
        </div>
        <div class="collapse-content">
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Save Changes</strong>: Click the <strong>Save</strong> icon <i class="mdi mdi-content-save"></i> in the top right to write your changes to the keyboard.</li>
            <li><strong>Export/Import</strong>: In the "Info" tab, you can backup your configuration to a <code class="badge badge-ghost">.json</code> file or restore a previous one.</li>
          </ul>
          <div class="alert alert-warning mt-4 text-sm">
            <i class="mdi mdi-alert-circle"></i>
            <span>Do not disconnect the keyboard while saving is in progress.</span>
          </div>
        </div>
      </div>
      
      <!-- Debug Console -->
      <div class="collapse collapse-arrow bg-base-200 mb-4 spring-hover">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          <i class="mdi mdi-bug mr-2"></i> Debug Console
        </div>
        <div class="collapse-content">
          <p class="mb-4">Monitor your keyboard's serial output for debugging macros or checking firmware status.</p>
          <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li>Click the <strong>Bug Icon</strong> <i class="mdi mdi-bug"></i> in the top right navigation bar.</li>
            <li>A sidebar will open showing real-time logs from the connected device.</li>
            <li>Useful for verifying if your macros are triggering correctly or if KMK is reporting errors.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Troubleshooting -->
    <section class="mb-12 glass-panel p-6 rounded-xl border border-error/20 animate-enter delay-400 no-hover">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2 text-error">
        <i class="mdi mdi-alert-circle-outline"></i> Troubleshooting
      </h2>
      <div class="space-y-4">
        <div>
          <h3 class="font-bold text-white">"Keyboard not connected"</h3>
          <p class="text-gray-400 text-sm">Ensure the <code class="font-mono text-xs bg-base-300 px-1 rounded">CIRCUITPY</code> drive is mounted and recognized by your OS. Try using a different USB cable.</p>
        </div>
        <div>
          <h3 class="font-bold text-white">Browser Compatibility</h3>
          <p class="text-gray-400 text-sm">This tool relies on the File System Access API. Please use <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.</p>
        </div>
        <div>
          <h3 class="font-bold text-white">Changes Not Saving</h3>
          <p class="text-gray-400 text-sm">Make sure you click the "Save" button in the top right corner.</p>
        </div>
      </div>
    </section>

     <!-- Technical Details -->
     <section class="opacity-60 text-sm animate-enter delay-500">
      <h2 class="text-lg font-bold mb-2">Technical Details</h2>
      <ul class="list-disc list-inside space-y-1">
        <li><strong>Firmware</strong>: Compatible with KMK Firmware (CircuitPython).</li>
        <li><strong>Platform</strong>: Web-based (PWA capable).</li>
        <li><strong>Connection</strong>: Uses browser-native File System APIs to edit <code class="font-mono">code.py</code> and <code class="font-mono">pog.json</code> directly on the device.</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
// Static content, no logic needed currently.
</script>

<style scoped>
/* Scoped overrides if necessary */
</style>
