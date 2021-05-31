
export function groupBy<T, K>(collection: T[], extractKey: (element: T) => K): Map<K, T[]> {
    return collection.reduce(groupByReducer(extractKey), new Map())
}

export function groupByReducer<T, K>(
    extractKey: (element: T) => K
): (previousValue: Map<K, T[]>, currentValue: T, currentIndex: number, array: T[]) => Map<K, T[]> {
    return (acc, value) => {
        const key = extractKey(value)
        if (!acc.has(key)) {
            acc.set(key, []);
        }
        acc.get(key).push(value);
        return acc;
    }
}
