import type { Tracker } from './trackers'
import { TrackersStore, trackersStore, TrackerStore, trackerStore } from './stores'
import { get } from 'svelte/store'

export interface ExportFormat {
    trackers: Tracker[]
}

export function exportFromStore(store: TrackersStore): ExportFormat {
    const trackers = get(store).reduce((prev: Tracker[], next: TrackerStore) => {
        return [...prev, get(next)]
    }, [])
    return { trackers }
}

export async function importFromFile() {
    return new Promise((resolve => {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = async () => {
            const file = input.files.item(0)
            const backup: ExportFormat = JSON.parse(await file.text())
            if (!window.confirm(
                'You are about to import ' + backup.trackers.length + ' trackers. Do you want to continue?'
            )) return
            await importBackup(backup)
            resolve(undefined)
        }
        input.click()
    }))
}

async function importBackup(backup: ExportFormat) {
    for (const tracker of backup.trackers) {
        await trackersStore.addOrUpdateTracker(tracker.id, tracker.meta)
        for (const entry of tracker.entries) {
            await trackerStore(tracker.id).addOrUpdateEntry(entry)
        }
    }
}
