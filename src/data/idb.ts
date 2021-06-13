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
            if (oldVersion < 1) v1CreateTrackerAndEntryStores(db)
        },
    })
}

export async function deleteMainDB() {
    await deleteDB(dbName)
}

function v1CreateTrackerAndEntryStores(db: IDBPDatabase<Schema>) {
    db.createObjectStore('tracker', { keyPath: 'trackerId' })
    const entries = db.createObjectStore('entry', { keyPath: 'id' })
    entries.createIndex('by-trackerId', 'trackerId')
    entries.createIndex('by-tags', 'tags', { multiEntry: true })
}

export let persistentStorageGranted = false

async function requestPersistentStoragePermission() {
    if (navigator.storage && navigator.storage.persist) {
        persistentStorageGranted = await navigator.storage.persist()
    }
}

export function generateId(): string {
    const timeValue = new Date().getTime().toString(36)
    const randomValue = randomIdString()
    return timeValue + '-' + randomValue
}

function randomIdString(length: number = defaultIdLength): string {
    const res: string[] = []
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * idChars.length)
        res.push(idChars[rand])
    }
    return res.join('')
}

const idChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const defaultIdLength = 11
