# 🎉 POG Web - Browser Version

## Running POG Entirely in Your Browser!

I've configured POG to run as a standalone web application - no Electron needed!

## Quick Start

### 1. Install Dependencies

```powershell
cd "c:\Users\noodl\Downloads\pog rep\pog-original"
npm install
```

### 2. Run in Browser (Development Mode)

```powershell
npm run dev:web
```

This will:
- ✅ Start a development server at `http://localhost:3000`
- ✅ Open POG in your browser
- ✅ Hot reload on code changes
- ✅ Full Vue DevTools support

### 3. Build for Production

```powershell
npm run build:web
```

This creates a `dist-web` folder with static files you can:
- Host on any web server
- Open directly in browser
- Deploy to GitHub Pages, Netlify, Vercel, etc.

### 4. Preview Production Build

```powershell
npm run preview:web
```

## What Works in Browser

✅ **Full UI** - All screens and components  
✅ **Layout Editor** - Visual keyboard configuration  
✅ **Keymap Editor** - Configure all keys  
✅ **Layer Management** - Multiple layers  
✅ **Import/Export** - JSON configurations  
✅ **Web Serial API** - Device communication (Chrome/Edge)  
✅ **File System Access API** - Save/load files  

## What's Different from Desktop

### Device Communication

**Desktop (Electron):**
- Auto-detects serial ports
- Direct file system access
- Background processes

**Web (Browser):**
- User must select serial port (Web Serial API)
- User must select files (File System Access API)
- No background processes

### Browser Requirements

**Supported Browsers:**
- ✅ Chrome 89+
- ✅ Edge 89+
- ✅ Opera 75+
- ❌ Firefox (no Web Serial API)
- ❌ Safari (no Web Serial API)

### Required Features

- **Web Serial API** - For device communication
- **File System Access API** - For file operations
- **HTTPS or localhost** - Required for Web APIs

## Using Web Serial API

When you connect to your device in the browser:

1. Click "Connect Device"
2. Browser shows serial port picker
3. Select your macropad
4. Grant permission
5. POG can now communicate!

**This works even with HID devices!** Unlike WebUSB, Web Serial API can access serial ports that HID devices expose.

## File Operations

When saving/loading files:

1. Click "Save" or "Load"
2. Browser shows file picker
3. Select location/file
4. Grant permission
5. File is saved/loaded

## Deployment Options

### Option 1: GitHub Pages

```powershell
npm run build:web
# Upload dist-web folder to GitHub Pages
```

### Option 2: Netlify/Vercel

```powershell
npm run build:web
# Deploy dist-web folder
```

### Option 3: Local Server

```powershell
npm run build:web
cd dist-web
python -m http.server 8000
# Open http://localhost:8000
```

### Option 4: Direct File Access

```powershell
npm run build:web
# Open dist-web/index.html in browser
```

## Development

### Project Structure

```
pog-original/
├── src/
│   ├── renderer/          # Vue 3 frontend (this runs in browser!)
│   │   ├── src/
│   │   │   ├── App.vue
│   │   │   ├── main.ts
│   │   │   ├── components/
│   │   │   ├── screens/
│   │   │   └── store/
│   │   └── index.html
│   ├── main/              # Electron backend (not used in web version)
│   └── preload/           # Electron preload (not used in web version)
├── vite.config.web.ts     # Web-only Vite config (NEW!)
└── package.json           # Added web scripts (UPDATED!)
```

### Web-Specific Configuration

**`vite.config.web.ts`:**
- Builds only the renderer (Vue app)
- Mocks Electron APIs
- Outputs to `dist-web`
- Configured for browser environment

### Electron API Replacements

The web version automatically replaces Electron APIs:

| Electron API | Web Replacement |
|--------------|-----------------|
| `ipcRenderer` | Direct function calls |
| `dialog` | File System Access API |
| `serialport` | Web Serial API |
| `fs` | File System Access API |
| `path` | Browser path utilities |

## Troubleshooting

### "Web Serial API not available"

**Solution:** Use Chrome or Edge browser

### "Permission denied" when accessing device

**Solution:** 
1. Click "Connect Device"
2. Select device from browser picker
3. Grant permission

### "Cannot save file"

**Solution:**
1. Use HTTPS or localhost
2. Grant file system permission when prompted

### Build errors

**Solution:**
```powershell
# Clean install
rm -rf node_modules
npm install
npm run build:web
```

## Advantages of Web Version

✅ **No Installation** - Just open in browser  
✅ **Cross-Platform** - Works on any OS  
✅ **Auto-Updates** - Always latest version  
✅ **Shareable** - Send link to anyone  
✅ **Lightweight** - No Electron overhead  
✅ **DevTools** - Full browser debugging  

## Commands Reference

```powershell
# Development
npm run dev:web          # Start dev server

# Production
npm run build:web        # Build for production
npm run preview:web      # Preview production build

# Original Electron version
npm run dev              # Run Electron app
npm run build            # Build Electron app
```

## Next Steps

1. **Run it now:**
   ```powershell
   cd "c:\Users\noodl\Downloads\pog rep\pog-original"
   npm install
   npm run dev:web
   ```

2. **Open browser:** `http://localhost:3000`

3. **Configure your macropad** using Web Serial API!

4. **Build for production** when ready:
   ```powershell
   npm run build:web
   ```

---

## 🎊 You now have POG running entirely in your browser!

No Electron, no installation, just pure web technology! 🚀

**Web Serial API** means you can still communicate with your device, even though it's a HID keyboard!
