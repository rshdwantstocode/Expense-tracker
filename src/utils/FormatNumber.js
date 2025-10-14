export const formatNumber = (number) => {
    if (number === null || number === undefined) return '0';

    return "₱ " + Number(number).toLocaleString('en-US');
};