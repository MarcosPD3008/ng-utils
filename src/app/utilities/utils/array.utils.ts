export function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
  
export function flattenArray<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

export const SortArray = (arr: any[], column: string, dir: 'asc' | 'desc') => {
  return arr.sort((a: any, b: any) => {
    let valA = a[column];
    let valB = b[column];

    // Convert dates from strings to Date objects
    if (Date.parse(valA) && Date.parse(valB)) {
      valA = new Date(valA);
      valB = new Date(valB);

      return dir === 'asc' ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
    }

    // Compare numbers 
    if (typeof valA === 'number') {
      return dir === 'asc' ? valA - valB : valB - valA;
    }

    // Compare strings
    if (typeof valA === 'string' && typeof valB === 'string') {
      return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    // Fallback for booleans or other types
    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}