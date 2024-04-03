import { Injectable } from '@angular/core';
// @ts-ignore
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private freecurrencyapi: Freecurrencyapi;

  constructor() {
    this.freecurrencyapi = new Freecurrencyapi(
      'fca_live_CMlzxcbe2QcJ9napunimMM2KzpoiTZ4ZjeNYWOJK'
    );
  }

  async getHistoricalCurrencies(param: {base_currency: string, currencies: string}) {
    const data  = await this.freecurrencyapi.historical(param)  
    return data.data
  }
}
