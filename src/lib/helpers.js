export const cleanFloat = value => {
    return parseFloat(String(value)
        .replace(/0000+[0-9]{2}$/, '')
        .replace(/([0-8])9999+[0-9]{2}$/, (a,b) => Number(b) + 1 )
    );
}