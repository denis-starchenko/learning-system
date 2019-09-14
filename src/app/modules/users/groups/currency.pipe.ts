import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
  transform(object): number {
    const result = object.sum * this.getCurrency(object.currencyCode);
    return Number(result.toFixed(2));
  }

  private getCurrency(value: string): number {
    return this.currencyValues[value];
  }

  private currencyValues = {
    'USD': 25.20,
    'EUR': 27.65
  }
}
