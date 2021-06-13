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

export async function importBackup(backup: ExportFormat) {
    backup.trackers.forEach(tracker => {
        trackersStore.addOrUpdateTracker(tracker.id, tracker.meta)
        tracker.entries.forEach(entry => {
            trackerStore(tracker.id).addOrUpdateEntry(entry)
        })
    })
}
