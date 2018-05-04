import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {

  transform(array: Array<any>, from: any, to:any): any {
    return array.filter(el => (new Date(from) <= new Date(el.date) && new Date(to) >= new Date(el.date)))
  }

}
