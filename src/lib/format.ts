/** Formats a price in Ngultrum, e.g. 45000 -> "Nu. 45,000" */
export const formatPrice = (price: number): string => `Nu. ${price.toLocaleString('en-IN')}`;
