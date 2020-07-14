import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCaseFirstLetter'
})
export class ToUpperCaseFirstLetterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
        return value.slice(0, 1).toUpperCase()
    }
    return null;
  }

}
