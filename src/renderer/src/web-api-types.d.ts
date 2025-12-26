// Type definitions for Web API Shim

declare global {
    interface Window {
        api: {
            // Serial Port APIs
            serialPorts(): Promise<any[]>;
            serialConnect(portPath: string): Promise<boolean>;
            serialDisconnect(): Promise<void>;
            serialSend(data: string): Promise<void>;
            serialData(callback: (event: any, data: { message: string }) => void): void;
            offSerialData(callback: ((event: any, data: { message: string }) => void) | null): void;
            serialConnectionStatus(callback: (event: any, status: { connected: boolean }) => void): void;

            // Keyboard/Drive APIs
            selectDrive(): Promise<any>;
            listDrives(): Promise<any[]>;
            listKeyboards(): Promise<Array<{ id: string; name: string; path: string; usingSerial?: boolean }>>;
            selectKeyboard(options: { id?: string; path?: string }): Promise<any>;
            deselectKeyboard(): void;
            checkForUSBKeyboards(paths: any): Promise<any[]>;
            rescanKeyboards(): void;

            // Configuration APIs
            saveConfiguration(data: any): Promise<boolean>;
            onSaveConfigurationProgress(callback: (event: any, progress: { progress: number }) => void): void;
            offSaveConfigurationProgress(callback: any): void;

            // Firmware APIs
            updateFirmware(): Promise<boolean>;
            flashDetectionFirmware(options: any): Promise<boolean>;
            onUpdateFirmwareInstallProgress(callback: any): void;

            // Detection APIs
            startDetection(): Promise<boolean>;
            stopDetection(): void;
            onDetectionUpdate(callback: (data: any, event: any) => void): void;
            removeDetectionListeners(): void;

            // Keyboard scan
            keyboardScan(callback: (event: any, data: { keyboards: any[] }) => void): void;
            serialKeyboardPogConfig(callback: (event: any, data: { pogconfig: any }) => void): void;

            // External links
            openExternal(url: string): void;
        };

        _serialDataCallback?: ((event: any, data: { message: string }) => void) | null;

        // File System Access API
        showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
        showSaveFilePicker(options?: {
            suggestedName?: string;
            types?: Array<{
                description: string;
                accept: Record<string, string[]>;
            }>;
        }): Promise<FileSystemFileHandle>;
    }

    interface Navigator {
        serial: {
            getPorts(): Promise<SerialPort[]>;
            requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>;
        };
    }

    interface SerialPort {
        open(options: { baudRate: number }): Promise<void>;
        close(): Promise<void>;
        readable: ReadableStream<Uint8Array>;
        writable: WritableStream<Uint8Array>;
    }

    interface SerialPortRequestOptions {
        filters?: Array<{
            usbVendorId?: number;
            usbProductId?: number;
        }>;
    }

    interface FileSystemFileHandle {
        createWritable(): Promise<FileSystemWritableFileStream>;
    }

    interface FileSystemWritableFileStream {
        write(data: string | BufferSource): Promise<void>;
        close(): Promise<void>;
    }

    interface FileSystemDirectoryHandle {
        name: string;
    }
}

export { };
