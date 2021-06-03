export interface Tracker {
    id: string
    meta: TrackerMeta
    entries: TrackerEntry[]
}

export interface TrackerEntry {
    id: string
    trackerId: string
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
    | 'pink'
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
