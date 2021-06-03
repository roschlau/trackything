import { Readable, writable } from 'svelte/store'
import { db } from './db-migration'
import type { Tracker, TrackerEntry, TrackerMeta } from './trackers'

export const trackersStore: Readable<TrackerStore[]> = function () {
    const { subscribe, set } = writable([])
    db.then(async db => {
        const trackerIds = await db.getAllKeys('tracker')
        set(trackerIds.map(trackerId => trackerStore(trackerId)))
    })
    return { subscribe }
}()
const trackerStores = new Map<string, TrackerStore>()

export function trackerStore(id: string): TrackerStore {
    if (trackerStores.has(id)) {
        return trackerStores.get(id)
    }
    const { subscribe, set, update } = writable(null)
    db.then(async db => {
        const meta = await db.get('tracker', id)
        const entries = await db.getAllFromIndex('entry', 'by-trackerId', id)
        set({ id, meta, entries })
    })
    const store = {
        trackerId: id,
        subscribe,
        async setMeta(meta: TrackerMeta) {
            await (await db).put('tracker', meta, id)
            update(original => ({ ...original, meta }))
        },
        async addEntry(entry: TrackerEntry) {
            if (entry.trackerId !== id) throw Error(`Tried adding entry of tracker ${entry.trackerId} to tracker ${id}`)
            await (await db).add('entry', entry)
            const entries = await (await db).getAllFromIndex('entry', 'by-trackerId', id)
            update(original => ({ ...original, entries }))
        },
    }
    trackerStores.set(id, store)
    return store
}

export interface TrackerStore extends Readable<Tracker | null> {
    trackerId: string
    setMeta(meta: TrackerMeta): Promise<void>
    addEntry(entry: TrackerEntry): Promise<void>
}
