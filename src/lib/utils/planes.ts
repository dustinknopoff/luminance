export function mapToPercentage(number, max) {
    return number / max
}

export function mapTo1Grid(number) {
    if (number < 0.5) {
        return Math.max(number / -0.5, -2)
    } else if (number > 0.5) {
        return Math.max(number / 0.5, 2)
    } else {
        return 0
    }
}