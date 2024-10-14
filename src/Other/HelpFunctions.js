export const getTypeForForm = (item) => {
    if (typeof (item) === 'number') return 'number';
    return 'text';
}