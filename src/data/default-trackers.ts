import type { TrackerMeta } from './trackers'
import { trackersStore } from './stores'

export function addDefaultTrackers() {
    defaultTrackers.forEach(async tracker => {
        await trackersStore.addTracker(tracker)
    })
}

const defaultTrackers: TrackerMeta[] = [
    {
        name: 'Sleep',
        color: 'teal',
        mainField: { name: 'Quality', unit: '', default: 3, min: 1, max: 5, step: 1 },
        tags: [],
    },
    {
        name: 'Water',
        color: 'blue',
        mainField: { name: 'Amount', unit: 'ml', default: 200, min: 0, max: 1000, step: 100 },
        tags: [],
    },
    {
        name: 'Activity',
        color: 'peach',
        mainField: { name: 'Duration', unit: 'min', default: 30, min: 0, max: 240, step: 10 },
        tags: [],
    },
]
