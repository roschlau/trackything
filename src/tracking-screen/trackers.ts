export const trackers: Tracker[] = [
    randomDummyTracker('1', {
        name: 'Sleep',
        color: 'teal',
        mainField: { type: 'mood', name: 'Quality', default: 2 },
        tags: ['With Partner', 'Woke Up Naturally', 'Didn\'t sleep through', 'Bad Dreams'],
    }),
    randomDummyTracker('2', {
        name: 'Water',
        color: 'blue',
        mainField: { type: 'numeric', name: 'Amount', unit: 'ml', default: 200, min: 0, max: 1000, step: 100 },
        tags: [],
    }),
    randomDummyTracker('3', {
        name: 'Activity',
        color: 'peach',
        mainField: { type: 'numeric', name: 'Duration', unit: 'min', default: 30, min: 0, max: 240, step: 10 },
        tags: ['Walk', 'Bike', 'VR - intense', 'VR - casual'],
    }),
]

function randomDummyTracker(id: string, meta: TrackerMeta) {
    const now = new Date().getTime()
    const offsets = [
        0,
        1000000,
        7000000,
        50000000,
        70000000,
        500000000,
        700000000,
        5000000000,
        7000000000,
        50000000000,
        70000000000,
        500000000000,
        500000400000,
    ].map(it => now - it)
    return Object.freeze({
        id: id,
        meta: meta,
        entries: offsets.map(time => (<TrackerEntry>{
            time,
            value: meta.mainField.type === 'numeric'
                ? meta.mainField.min + Math.round(Math.random() * (meta.mainField.max - meta.mainField.min))
                : Math.round(Math.random() * 5),
            tags: pickRandom(meta.tags),
            comment: '',
        })),
    })
}

function pickRandom<T>(collection: T[]): T[] {
    return collection.filter(() => Math.random() > .5)
}

export interface Tracker {
    id: string
    meta: TrackerMeta
    entries: TrackerEntry[]
}

export interface TrackerEntry {
    time: number
    value: number
    tags: string[]
    comment: string
}

export interface TrackerMeta {
    name: string
    color: TrackerColor
    mainField: FieldDefinition
    tags: string[]
}

export type TrackerColor =
    | 'teal'
    | 'peach'
    | 'blue'

export type FieldDefinition =
    | MoodField
    | NumericField

export interface MoodField {
    type: 'mood'
    name: string
    default: number
}

export interface NumericField {
    type: 'numeric'
    name: string
    unit: string
    default: number
    min: number
    max: number
    step: number
}
