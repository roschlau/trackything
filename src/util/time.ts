import { sprintf } from 'sprintf-js'

export function showTime(timestamp: number | Date): string {
    const date = typeof timestamp === 'number'
        ? new Date(timestamp)
        : timestamp
    return sprintf('%1$02d:%2$02d', date.getHours(), date.getMinutes())
}

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export function relativeTime(time: number, accuracy: 'minute' | 'day' = 'minute'): string {
    const now = new Date()
    const then = new Date(time)
    const diffMillis = now.getTime() - then.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    if (diffMillis < oneDay) {
        // Might be today
        if (now.getDate() === then.getDate()) {
            // Yup, today.
            return accuracy === 'minute' ? showTime(then) : 'Today'
        }
    }
    if (diffMillis < oneDay * 2) {
        return 'Yesterday'
    }
    if (diffMillis < oneDay * 7) {
        return days[then.getDay()]
    }
    if (diffMillis < oneDay * 365 && then.getFullYear() === now.getFullYear()) {
        return sprintf('%1$02d.%2$02d', then.getDate(), then.getMonth() + 1)
    }
    if (then.getFullYear() + 1 === now.getFullYear()) {
        return 'Last Year'
    }
    return then.getFullYear().toString()
}

export function areSameDay(date1: Date | number, date2: Date | number): boolean {
    const d1 = coerceDate(date1)
    const d2 = coerceDate(date2)
    return d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate()
}

function coerceDate(date: Date | number): Date {
    if (typeof date !== 'number') return date
    return new Date(date)
}
