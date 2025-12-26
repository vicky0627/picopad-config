import { exec } from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)

export interface Drive {
    mountpoints: { path: string; label: string }[]
    isReadOnly: boolean
    isRemovable: boolean
    isSystem: boolean
    isUSB: boolean
    isCard: boolean
    description: string
}

export const scanDrives = async (): Promise<Drive[]> => {
    try {
        const { stdout } = await execAsync(
            'powershell -Command "Get-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceID, VolumeName, DriveType"'
        )

        const lines = stdout.split('\r\n').filter((line) => line.trim() !== '')
        // Header is usually first line, but we can skip checking it if we trust structure. 
        // Format is "DeviceID VolumeName DriveType"
        // However, fixed width columns or CSV? PowerShell default output is formatted table.
        // Better to ask for CSV or JSON.

        // JSON is easier to parse
        const { stdout: jsonStdout } = await execAsync(
            'powershell -Command "Get-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceID, VolumeName, DriveType | ConvertTo-Json"'
        )

        if (!jsonStdout.trim()) return []

        let diskData: any[]
        try {
            const parsed = JSON.parse(jsonStdout)
            diskData = Array.isArray(parsed) ? parsed : [parsed]
        } catch (e) {
            console.error('Failed to parse drives JSON', e)
            return []
        }

        return diskData.map((disk) => {
            const isRemovable = disk.DriveType === 2
            const isSystem = disk.DeviceID === 'C:' // Crude check

            return {
                mountpoints: [{ path: disk.DeviceID + '\\', label: disk.VolumeName || 'Local Disk' }],
                isReadOnly: false,
                isRemovable: isRemovable,
                isSystem: isSystem,
                isUSB: isRemovable, // Assume removable is USB/Card
                isCard: false,
                description: disk.VolumeName || 'Local Disk'
            } as Drive
        })

    } catch (error) {
        console.error('Error scanning drives:', error)
        return []
    }
}
