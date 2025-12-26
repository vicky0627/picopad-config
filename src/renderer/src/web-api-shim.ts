// Web API Shim for POG
// This replaces Electron APIs with Web APIs

import { pogpy } from './pythontemplates/pog'
import { codepy } from './pythontemplates/code'
import { coordmaphelperpy } from './pythontemplates/coordmaphelper'
import { customkeyspy } from './pythontemplates/customkeys'
import { kbpy } from './pythontemplates/kb'
import { keymappy } from './pythontemplates/keymap'
import { bootpy } from './pythontemplates/boot'
import { pog_serialpy } from './pythontemplates/pog_serial'

/// <reference path="./web-api-types.d.ts" />

// Mock window.api for web environment
if (typeof window !== 'undefined' && !window.api) {
    console.log('🌐 Initializing Web API shim for POG...')

    // Web Serial API wrapper
    let serialPort: SerialPort | null = null
    let serialReader: ReadableStreamDefaultReader<Uint8Array> | null = null
    let serialWriter: WritableStreamDefaultWriter<Uint8Array> | null = null
    let currentDirHandle: FileSystemDirectoryHandle | null = null
    const knownPorts = new Map<string, SerialPort>();

    window.api = {
        // Serial Port APIs
        async serialPorts() {
            if ('serial' in navigator) {
                const ports = await navigator.serial.getPorts();
                knownPorts.clear();
                
                const portList = ports.map((_port, index) => {
                    const id = `web-serial-${index}`;
                    knownPorts.set(id, _port);
                    return {
                        path: id,
                        port: `Device ${index + 1}`,
                        manufacturer: 'Authorized Device',
                        serialNumber: `serial-${index}`
                    };
                });

                // Always add option to request new device
                portList.unshift({
                    path: 'request-new-port',
                    port: 'Add New Device...',
                    manufacturer: 'Web Serial',
                    serialNumber: 'NEW'
                });

                return portList;
            }
            return [];
        },

        async serialConnect(portPath) {
            if ('serial' in navigator) {
                try {
                    if (portPath === 'request-new-port') {
                        serialPort = await navigator.serial.requestPort();
                    } else {
                        serialPort = knownPorts.get(portPath) || await navigator.serial.requestPort();
                    }

                    if (!serialPort) throw new Error('No port selected');

                    await serialPort.open({ baudRate: 115200 });

                    serialReader = serialPort.readable.getReader();
                    serialWriter = serialPort.writable.getWriter();

                    // Start reading
                    readSerial();

                    console.log('✅ Serial connected via Web Serial API');
                    return true;
                } catch (error) {
                    console.error('Serial connection error:', error);
                    return false;
                }
            } else {
                alert('Web Serial API not supported in this browser. Please use Chrome or Edge.');
                return false;
            }
        },

        async serialDisconnect() {
            if (serialReader) {
                await serialReader.cancel();
                serialReader = null;
            }
            if (serialWriter) {
                await serialWriter.close();
                serialWriter = null;
            }
            if (serialPort) {
                await serialPort.close();
                serialPort = null;
            }
            console.log('Serial disconnected');
        },

        async serialSend(data) {
            if (serialWriter) {
                const encoder = new TextEncoder();
                let output;
                if (data === 'ctrlc') {
                    output = '\x03\x03';
                } else if (data === 'ctrld') {
                    output = '\x04';
                } else {
                    output = data + '\r\n';
                }
                await serialWriter.write(encoder.encode(output));
            }
        },

        serialData(callback: (event: any, data: { message: string }) => void) {
            window._serialDataCallback = callback;
        },

        offSerialData(_callback) {
            window._serialDataCallback = null;
        },

        serialConnectionStatus(callback) {
            // Mock - always connected for now
            callback(null, { connected: !!serialPort });
        },

        // Keyboard/Drive APIs
        async selectDrive() {
            if ('showDirectoryPicker' in window) {
                try {
                    const dirHandle = await window.showDirectoryPicker()
                    currentDirHandle = dirHandle
                    const folderContents: string[] = []
                    let configContents: any = {}

                    // Read directory contents
                    // @ts-ignore
                    for await (const entry of dirHandle.values()) {
                        folderContents.push(entry.name)

                        // If pog.json exists, read it
                        if (entry.name === 'pog.json' && entry.kind === 'file') {
                            const file = await (entry as FileSystemFileHandle).getFile()
                            const text = await file.text()
                            try {
                                configContents = JSON.parse(text)
                                // Handle case where file was saved with wrapper
                                if (configContents.pogConfig) {
                                    configContents = configContents.pogConfig
                                }
                            } catch (e) {
                                console.error('Failed to parse pog.json', e)
                            }
                        }
                    }

                    return {
                        path: dirHandle.name,
                        name: dirHandle.name,
                        id: dirHandle.name,
                        folderContents,
                        configContents,
                        // Add other standard keyboard properties that might be expected
                        keys: configContents.keys || [],
                        layouts: configContents.layouts || []
                    }
                } catch (error) {
                    console.log('User cancelled directory picker or error occurred', error)
                    return null
                }
            } else {
                alert('File System Access API not supported. Please use Chrome or Edge.')
                return null
            }
        },

        async listDrives() {
            // Can't list drives in web, user must select
            return [];
        },

        async listKeyboards() {
            // In web mode, we don't list keyboards automatically like in Electron
            // The user connects via selectDrive or serialConnect
            return [];
        },

        async selectKeyboard(options) {
            console.log('selectKeyboard called with:', options);
            // Return mock keyboard data
            return {
                id: options.id || 'web-keyboard',
                path: options.path || '/web-keyboard',
                name: 'Web Keyboard',
                pogconfig: {}
            };
        },

        deselectKeyboard() {
            console.log('Keyboard deselected');
        },

        async checkForUSBKeyboards(_paths) {
            // Can't check USB in web
            return [];
        },

        rescanKeyboards() {
            console.log('Rescan keyboards (no-op in web)');
        },

        // Configuration APIs
        // Configuration APIs
        async saveConfiguration(data) {
            console.log('Saving configuration via Shim');
            try {
                const { pogConfig, serial, writeFirmware } = JSON.parse(data);

                if (serial) {
                    console.log('Serial saving not fully implemented in web shim yet');
                    alert('Saving via Serial not fully supported in web version yet. Please use USB Drive mode if possible.');
                    return false;
                }

                if (currentDirHandle) {
                    console.log('Writing to connected drive...');

                    // 1. Write pog.json
                    const pogJsonHandle = await currentDirHandle.getFileHandle('pog.json', { create: true });
                    const pogJsonWritable = await pogJsonHandle.createWritable();
                    await pogJsonWritable.write(JSON.stringify(pogConfig, null, 4));
                    await pogJsonWritable.close();
                    console.log('pog.json written');

                    // 2. Write firmware files if needed
                    const files = [
                        { name: 'pog.py', contents: pogpy },
                        { name: 'code.py', contents: codepy },
                        { name: 'coordmaphelper.py', contents: coordmaphelperpy },
                        { name: 'customkeys.py', contents: customkeyspy },
                        { name: 'boot.py', contents: bootpy },
                        { name: 'pog_serial.py', contents: pog_serialpy },
                        { name: 'keymap.py', contents: keymappy },
                        { name: 'kb.py', contents: kbpy }
                    ];

                    for (const file of files) {
                        let shouldWrite = writeFirmware;
                        if (!shouldWrite) {
                            // Check if file exists
                            try {
                                await currentDirHandle.getFileHandle(file.name);
                            } catch (e) {
                                // File doesn't exist, so we should write it
                                shouldWrite = true;
                            }
                        }

                        if (shouldWrite) {
                            console.log(`Writing ${file.name}...`);
                            const fileHandle = await currentDirHandle.getFileHandle(file.name, { create: true });
                            const writable = await fileHandle.createWritable();
                            await writable.write(file.contents);
                            await writable.close();
                        }
                    }

                    alert('Configuration saved to device!');
                    return true;

                } else {
                    // Fallback to Save As execution
                    console.log('No drive connected, falling back to Save As');
                    if ('showSaveFilePicker' in window) {
                        const handle = await window.showSaveFilePicker({
                            suggestedName: 'pog.json',
                            types: [{
                                description: 'POG Configuration',
                                accept: { 'application/json': ['.json'] }
                            }]
                        });
                        const writable = await handle.createWritable();
                        await writable.write(JSON.stringify(pogConfig, null, 4));
                        await writable.close();
                        alert('Configuration saved (pog.json only).');
                        return true;
                    }
                    return false;
                }

            } catch (e) {
                console.error('Error saving configuration:', e);
                alert('Error saving configuration: ' + e);
                return false;
            }
        },

        onSaveConfigurationProgress(callback) {
            // Mock progress
            setTimeout(() => callback(null, { progress: 100 }), 100);
        },

        offSaveConfigurationProgress(_callback) {
            // No-op
        },

        // Firmware APIs
        async updateFirmware() {
            console.log('Update firmware (not supported in web)');
            alert('Firmware update is not available in the web version. Please use the desktop app for firmware updates.');
            return false;
        },

        async flashDetectionFirmware(_options) {
            console.log('Flash detection firmware (not supported in web)');
            return false;
        },

        onUpdateFirmwareInstallProgress(_callback) {
            // No-op
        },

        // Detection APIs
        async startDetection() {
            console.log('Start detection (not supported in web)');
            return false;
        },

        stopDetection() {
            console.log('Stop detection');
        },

        onDetectionUpdate(_callback) {
            // No-op
        },

        removeDetectionListeners() {
            // No-op
        },

        // Keyboard scan
        keyboardScan(callback) {
            // Mock - no keyboards initially
            setTimeout(() => {
                callback(null, { keyboards: [] });
            }, 100);
        },

        serialKeyboardPogConfig(_callback) {
            // Mock - no config initially
        },

        // External links
        openExternal(url) {
            window.open(url, '_blank');
        }
    };


    // Serial reading function
    const readSerial = async () => {
        if (!serialReader) return

        try {
            while (true) {
                const { value, done } = await serialReader.read()
                if (done) break

                const decoder = new TextDecoder()
                const text = decoder.decode(value)

                if (window._serialDataCallback) {
                    window._serialDataCallback(null, { message: text }) // Pass as object
                }
            }
        } catch (error) {
            console.error('Serial read error:', error)
        }
    }

    console.log('✅ Web API shim loaded');
    console.log('📝 Note: Some features require user interaction (Web Serial, File System Access)');
}

export { };
