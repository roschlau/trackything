import { DBSchema, deleteDB, IDBPDatabase, openDB } from 'idb'
import type { TrackerEntry, TrackerMeta } from './trackers'

interface Schema extends DBSchema {
    tracker: {
        key: string
        value: TrackerMeta
    }
    entry: {
        key: string
        value: TrackerEntry
        indexes: {
            'by-trackerId': string
            'by-tags': string
        }
    }
}

export const db = setUpDb()

const dbName = 'trackything_main_db'

async function setUpDb(): Promise<IDBPDatabase<Schema>> {
    await requestPersistentStoragePermission()
    return await openDB<Schema>(dbName, 1, {
        upgrade: (db, oldVersion, newVersion, tx) => {
            if (oldVersion < 1) v1(db)
        },
    })
}

export async function deleteMainDB() {
    await deleteDB(dbName)
}

function v1(db: IDBPDatabase<Schema>) {
    db.createObjectStore('tracker')
    const entries = db.createObjectStore('entry', { keyPath: 'id' })
    entries.createIndex('by-trackerId', 'trackerId')
    entries.createIndex('by-tags', 'tags', { multiEntry: true })
}

async function requestPersistentStoragePermission() {
    if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist()
        if (!isPersisted && window) {
            window.alert('Persistent storage permission not granted. Your data might not be safe from eviction.')
        }
    }
}
