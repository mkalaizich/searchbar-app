export function sanitizeString(string) {
    return string.toLowerCase().replaceAll('.', '').replaceAll(`'`, '')
}
