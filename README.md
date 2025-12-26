# Picopad Configuration Suite

<div align="center">
  <img src="src/renderer/src/assets/icon.png" alt="Picopad Logo" width="128" height="128" />
  <br/>
  <h3>The Ultimate Companion for your Picopad Keyboard</h3>

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Version](https://img.shields.io/badge/version-2.2.0-green.svg)](package.json)
  [![Vue](https://img.shields.io/badge/vue-3.x-42b883.svg)](https://vuejs.org/)
  [![Electron](https://img.shields.io/badge/electron-21.x-47848F.svg)](https://www.electronjs.org/)
</div>

<br/>

## 📖 Overview

**Picopad Configuration Suite** is a cutting-edge graphical interface designed to unlock the full potential of Picopad keyboards powered by [KMK Firmware](https://github.com/KMKfw/kmk_firmware). 

Whether you are a casual typist or a power user, this tool allows you to customize every aspect of your device—from simple key remapping to complex macros and dynamic lighting effects—all through a beautiful, modern user interface.

---

## ✨ Key Features

- **🎹 Visual Keymap Editor**: Remap your keys effortlessly using an intuitive drag-and-drop interface.
- **⚡ Real-time Configuration**: Changes are saved and applied swiftly to your device.
- **🎨 Layer Management**: Seamlessly configure multiple logical layers for advanced workflow efficiency.
- **💡 Lighting Control**: Customize RGB lighting patterns, colors, and animations to match your setup.
- **🚀 Macro Support**: Create powerful macros to automate repetitive tasks with a single keystroke.
- **💻 Cross-Platform**: Experience the same robust functionality on the Web or as a native Desktop App (Windows, macOS, Linux).

---

## 🚀 Getting Started

### 🌐 Web Configurator
Access the full suite directly in your browser without installing anything (Chrome, Edge, or other WebHID-supported browsers recommended):

👉 **[Launch Web Configurator](https://picopad-config.web.app)**

### 🖥️ Desktop Application
Prefer a standalone app? Download the latest release for your operating system:

📥 **[Download Latest Release](https://github.com/vicky0627/picopad-config/releases)**

---

## 🛠️ Development

If you're a developer looking to contribute or build the project from source, follow the steps below.

### Prerequisites
*   **Node.js**: v16 or higher
*   **Yarn** or **npm**

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/vicky0627/picopad-config.git
cd picopad-config
npm install
```

### Running Locally

**Web Version**:
```bash
npm run dev:web
```

**Desktop Version (Electron)**:
```bash
npm run dev
```

### Building for Production

**Web Build**:
```bash
npm run build:web
```

**Desktop Build**:
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Credits

Built upon the excellent foundation of the [POG Project](https://github.com/JanLunge/pog).
