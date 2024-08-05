import { Pipe, PipeTransform } from '@angular/core';
import { SortArray } from '../utils/array.utils';
@Pipe({
    name: 'sortArray'
})

export class SortArrayPipe implements PipeTransform {
    transform(value: any, column:string, dir: 'asc' | 'desc' = 'asc'): any {
        if (!value || !column) {
            return value;
        }
        
        return SortArray(value, column, dir);
    }
}