export const cleanFloat = value => {
    return parseFloat(String(value)
        .replace(/00+[0-9]$/, '')
        .replace(/([0-8])99+[0-9]$/, (a,b) => Number(b) + 1 )
    );
}