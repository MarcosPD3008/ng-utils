export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  
export function truncateString(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + '...' : str;
}