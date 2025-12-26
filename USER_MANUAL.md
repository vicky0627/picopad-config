# Picopad Configurator - User Manual

## Overview
**Picopad Configurator** is a premium, web-based tool designed to effortlessly customize your Picopad Pro mechanical keyboard. Built on top of the KMK firmware ecosystem, it offers a visual interface to remap keys, create macros, manage layers, and adjust settings without writing a single line of code.

**Web App URL**: [https://picopad-config.web.app](https://picopad-config.web.app)

---

## 🚀 Getting Started

1.  **Connect Your Keyboard**: Plug your Picopad keyboard into your computer via USB.
2.  **Open the Configurator**: Navigate to [https://picopad-config.web.app](https://picopad-config.web.app) in a Chrome-based browser (Chrome, Edge, Opera) for the best compatibility with WebUSB/WebSerial.
3.  **Detect Keyboard**:
    *   Click **"Add existing Picopad keyboard"**.
    *   Select the drive corresponding to your keyboard (usually labeled `CIRCUITPY`).
    *   The dashboard will load your current configuration.

---

## 🎨 Premium Interface Features

The application features a modern, dark-themed interface with:
*   **Rounded Aesthetics**: Smooth corners and circular logos for a friendly, modern look.
*   **Glassmorphism**: Semi-transparent sidebars and panels for depth.
*   **Grid Background**: A subtle, high-tech backdrop.
*   **Interactive Keys**: Keys glow and react to hover/click for visual feedback.

---

## 🛠 Features & How-to

### 1. Key Mapping
Customizing your key layout is the core feature.
*   **Select a Key**: Click any key on the visual representation of your keyboard.
*   **Choose a Function**: The **Key Picker** panel will appear at the bottom.
*   **Categories**:
    *   **Basic**: Standard letters, numbers, and symbols.
    *   **Layers**: Layer switching keys (MO, TO, TG).
    *   **KMK**: Special firmware commands (Reset, Reload).
    *   **Media**: Volume control, Play/Pause, Brightness.
    *   **RGB**: Lighting controls (Hue, Saturation, Animation modes).

### 2. Shortcut Builder
Create complex key combinations (e.g., `Ctrl + Shift + T`) easily.
1.  Navigate to the **Key Picker**.
2.  Locate the **Shortcut Builder** section.
3.  **Toggle Modifiers**: Click to enable `Ctrl`, `Shift`, `Alt`, or `Win`.
4.  **Select Trigger Key**: Choose the main key (e.g., `T`, `Delete`) from the dropdown.
5.  **Preview**: See the resulting combo (e.g., `Ctrl + Shift + T`).
6.  **Create**: Click the arrow button to assign this shortcut to your selected key.

### 3. Layer Management
*   Picopad supports multiple layers (e.g., a base layer for typing, a second layer for navigation/media).
*   Use layer keys (from the **Layers** category) to switch between them.

### 4. Configuration Management
*   **Save Changes**: Click the **Save** icon in the top right to write your changes to the keyboard.
*   **Export/Import**: In the "Info" tab, you can backup your configuration to a `.json` file or restore a previous one.

---

## 🔌 Troubleshooting

*   **"Keyboard not connected"**: Ensure the `CIRCUITPY` drive is mounted and recognized by your OS. Try using a different USB cable.
*   **Browser Compatibility**: This tool relies on the File System Access API. Please use **Google Chrome** or **Microsoft Edge**.
*   **Changes Not Saving**: Make sure you click the "Save" button in the top right corner. Do not disconnect the keyboard while saving is in progress.

---

## 📜 Technical Details
*   **Firmware**: Compatible with KMK Firmware (CircuitPython).
*   **Platform**: Web-based (PWA capable).
*   **Connection**: Uses browser-native File System APIs to edit `code.py` and `pog.json` directly on the device.
