# Picopad Configuration Suite

A powerful configuration tool for Picopad keyboards, based on KMK firmware.

![Picopad Logo](src/renderer/src/assets/icon.png)

## Features
- **Visual Keymap Editor**: Easily remap your keys using a graphical interface.
- **Layer Management**: Configure multiple layers for advanced workflows.
- **Lighting Control**: Customize your keyboard's RGB lighting.
- **Macro Support**: Create complex macros to automate tasks.
- **Web & Desktop**: Available as both a web application and a standalone desktop app.

## Web Configurator
Access the configuration suite directly in your browser (Chrome/Edge recommended):
[Launch Web Configurator](https://picopad-config.web.app)

## Desktop App
Download the latest desktop application from the [Releases](https://github.com/vicky0627/picopad-config/releases) page.

## Development

### Prerequisites
- Node.js 16+
- Yarn

### Setup
```bash
# Install dependencies
npm install
```

### Run Web Version
```bash
npm run dev:web
```

### Build Web Version
```bash
npm run build:web
```

### Run Desktop Version (Electron)
```bash
npm run dev
```

### Build Desktop Version
```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Credits
Based on the POG project.
