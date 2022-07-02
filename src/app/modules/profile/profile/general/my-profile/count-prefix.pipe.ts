import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countPrefix',
})
export class CountPrefixPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    switch (value) {
      case 0:
        return 'Primary';
      case 1:
        return 'Secondary';
      case 2:
        return '3rd';
      default:
        return value + 1 + 'th';
    }
  }
}
