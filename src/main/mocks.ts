
// Mock implementation of serialport and drivelist for development without native dependencies

export class SerialPort {
    isOpen: boolean = false;
    path: string;
    baudRate: number;

    constructor(options: any, callback?: any) {
        this.path = options.path;
        this.baudRate = options.baudRate;
        this.isOpen = options.autoOpen !== false;
        if (this.isOpen && callback) {
            setTimeout(() => callback(null), 10);
        }
    }

    static async list(): Promise<any[]> {
        console.log('[Mock] SerialPort.list() called');
        return [];
    }

    pipe(destination: any) {
        return destination;
    }

    on(event: string, callback: any) {
        // No-op for events
    }

    once(event: string, callback: any) {
        // No-op
    }

    write(data: any, callback?: any) {
        console.log('[Mock] SerialPort.write:', data);
        if (callback) callback(null);
    }

    close(callback?: any) {
        this.isOpen = false;
        if (callback) callback(null);
    }

    open(callback?: any) {
        this.isOpen = true;
        if (callback) callback(null);
    }
}

export class ReadlineParser {
    constructor(options?: any) { }
    on(event: string, callback: any) { }
    once(event: string, callback: any) { }
}

export const drivelist = {
    list: async (): Promise<any[]> => {
        console.log('[Mock] drivelist.list() called');
        return [];
    }
}

export default {
    SerialPort,
    ReadlineParser
}
