export const trackers: Tracker[] = [
    Object.freeze({
        id: '1',
        meta: {
            name: 'Sleep',
            color: 'teal',
            mainField: { type: 'mood', name: 'Quality', default: 2 },
            tags: ['With Partner', 'Woke Up Naturally', 'Didn\'t sleep through', 'Bad Dreams'],
        },
        entries: [],
    }),
    Object.freeze({
        id: '2',
        meta: {
            name: 'Water',
            color: 'blue',
            mainField: { type: 'numeric', name: 'Amount', unit: 'ml', default: 200, min: 0, max: 1000, step: 100 },
            tags: [],
        },
        entries: [],
    }),
    Object.freeze({
        id: '3',
        meta: {
            name: 'Movement',
            color: 'peach',
            mainField: { type: 'numeric', name: 'Duration', unit: 'min', default: 30, min: 0, max: 1440, step: 10 },
            tags: ['Walk', 'Bike', 'VR - intense', 'VR - casual'],
        },
        entries: [],
    }),
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
