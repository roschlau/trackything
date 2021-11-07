import { generateId } from './idb'

export interface Tracker {
  id: string
  meta: TrackerMeta
  entries: TrackerEntry[]
}

export interface TrackerEntry {
  id: string
  trackerId: string
  time: number
  value?: number
  tags: string[]
  comment: string
}

export interface TrackerMetaUpdate {
  trackerId: string
  name: string
  color: TrackerColor
  mainField: NumericField | null
  tags: string[]
}

export interface TrackerMeta extends TrackerMetaUpdate {
  createdAt: number
}

export type TrackerColor =
  | 'pink'
  | 'teal'
  | 'peach'
  | 'blue'

export interface NumericField {
  name: string
  unit: string
  default: number
  min: number
  max: number
  step: number
}

export const createNewEmptyEntry = (tracker: Tracker) => {
  const entry: TrackerEntry = {
    id: generateId(),
    trackerId: tracker.id,
    time: new Date().getTime(),
    tags: [],
    comment: '',
  }
  if (tracker.meta.mainField !== null) {
    entry.value = tracker.meta.mainField.default
  }
  return entry
}
