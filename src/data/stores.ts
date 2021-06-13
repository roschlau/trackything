import { Readable, writable } from 'svelte/store'
import { db, generateId } from './idb'
import type { Tracker, TrackerEntry, TrackerMeta } from './trackers'

export interface TrackersStore extends Readable<TrackerStore[]> {
    addTracker(meta: TrackerMeta): Promise<void>
    addOrUpdateTracker(id: string, meta: TrackerMeta): Promise<void>
}

export const trackersStore: TrackersStore = function () {
    const { subscribe, set, update } = writable([])
    async function loadTrackers() {
        const trackerIds = await (await db).getAllKeys('tracker')
        set(trackerIds.map(trackerId => trackerStore(trackerId)))
    }
    loadTrackers()
    return {
        subscribe,
        async addTracker(meta: TrackerMeta) {
            const id = generateId()
            await (await db).add('tracker', meta, id)
            update(previousStores => [...previousStores, trackerStore(id)])
        },
        async addOrUpdateTracker(id: string, meta: TrackerMeta) {
            await (await db).put('tracker', meta, id)
            await loadTrackers()
        },
    }
}()

const trackerStores = new Map<string, TrackerStore>()

export function trackerStore(id: string): TrackerStore {
    if (trackerStores.has(id)) {
        return trackerStores.get(id)
    }
    const { subscribe, set, update } = writable(null)
    db.then(async db => {
        const meta = await db.get('tracker', id)
        const entries = (await db.getAllFromIndex('entry', 'by-trackerId', id)).reverse()
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
            const entries = (await (await db).getAllFromIndex('entry', 'by-trackerId', id)).reverse()
            update(original => ({ ...original, entries }))
        },
        async addOrUpdateEntry(entry: TrackerEntry) {
            if (entry.trackerId !== id) throw Error(`Tried adding entry of tracker ${entry.trackerId} to tracker ${id}`)
            await (await db).put('entry', entry)
            const entries = (await (await db).getAllFromIndex('entry', 'by-trackerId', id)).reverse()
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
    addOrUpdateEntry(entry: TrackerEntry): Promise<void>
}
