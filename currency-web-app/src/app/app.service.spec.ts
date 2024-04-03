import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get historical data for USD/ZAR', async () => {
    const data = await service.getHidtoricalCurreny({base_currency: "USD", currencies: "ZAR"})
    const expectedData = {"2024-04-02":{"ZAR":18.7654120417}}
    expect(data).toBeDefined()
    expect(typeof data).toBe("object")
    expect(JSON.stringify(data)).toBe(JSON.stringify(expectedData))
  })

  it('should get historical data for USD/EUR', async () => {
    const data = await service.getHidtoricalCurreny({base_currency: "USD", currencies: "EUR"})
    const expectedData = {"2024-04-02":{"EUR":0.9285001096}}
    expect(data).toBeDefined()
    expect(typeof data).toBe("object")
    expect(JSON.stringify(data)).toBe(JSON.stringify(expectedData))
  })
});
