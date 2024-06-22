import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return Object.keys(item).some(key => {
        if (item[key]) {
          return item[key].toString().toLowerCase().includes(searchTerm);
        }
        return false;
      });
    });
  }

}
