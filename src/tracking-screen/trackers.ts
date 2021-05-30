export const trackers: Tracker[] = [
    {
        id: '1',
        meta: {
            name: 'Sleep',
            mainField: { type: 'mood', name: 'Quality', default: 3 },
            tags: ['With Partner', 'Woke Up Naturally', 'Bad Dreams', 'Slept Through'],
        },
        entries: [],
    },
    {
        id: '2',
        meta: {
            name: 'Water',
            mainField: { type: 'numeric', name: 'Amount', unit: 'ml', default: 200, min: 0, max: 1000, step: 100 },
            tags: [],
        },
        entries: [],
    },
    {
        id: '3',
        meta: {
            name: 'Movement',
            mainField: { type: 'numeric', name: 'Duration', unit: 'min', default: 30, min: 0, max: 1440, step: 10 },
            tags: ['Walk', 'Bike', 'VR - intense', 'VR - casual'],
        },
        entries: [],
    },
]

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
    mainField: FieldDefinition
    tags: string[]
}

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
