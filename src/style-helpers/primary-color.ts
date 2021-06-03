import type { TrackerColor } from '../data/trackers'

const propName = '--color-primary'
export function primaryColor(node: HTMLElement, color: TrackerColor) {
    node.style.setProperty(propName, `var(--color-${color})`)

    return {
        update(newColor) {
            node.style.setProperty(propName, `var(--color-${newColor})`)
        },
        destroy() {
            node.style.removeProperty(propName)
        },
    }
}
