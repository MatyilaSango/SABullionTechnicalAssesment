import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { Chart, registerables } from "chart.js/auto"
import { BUTTONS, CURRENCIES } from './enums/enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Historical currency exchange rates';
  activeHistoricalCurrencies: any;
  activeButton: string = BUTTONS.USD_ZAR
  USD_ZAR_style: string = ""
  USD_EUR_style: string = ""
  chart: any = []
  freeCurrencyService = inject(AppService)

  ngOnInit(): void {
    this.getHistoricalCurreny(CURRENCIES.ZAR)  
  }

  async getHistoricalCurreny(currency: string){
    const data = await this.freeCurrencyService.getHidtoricalCurreny({base_currency: CURRENCIES.USD, currencies: currency})
    this.activeHistoricalCurrencies = data

    switch(currency){
      case CURRENCIES.ZAR:
        this.activeButton = BUTTONS.USD_ZAR
        this.USD_EUR_style= "opacity: 1"
        this.USD_ZAR_style = "opacity: 0.5";
        (document.querySelector("#usd-zar") as HTMLButtonElement).disabled = true;
        (document.querySelector("#usd-eur") as HTMLButtonElement).disabled = false
        break;

      case CURRENCIES.EUR:
        this.activeButton = BUTTONS.USD_EUR
        this.USD_EUR_style = "opacity: 0.5"
        this.USD_ZAR_style = "opacity: 1";
        (document.querySelector("#usd-zar") as HTMLButtonElement).disabled = false;
        (document.querySelector("#usd-eur") as HTMLButtonElement).disabled = true;
        break;
    }
    
    try{
      this.chart?.destroy()
    } catch(err){}
    this.configureLineChart()
  }

  configureLineChart(){
    Chart.register(...registerables)
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: Object.keys(this.activeHistoricalCurrencies),
        datasets: [
          {
            label: this.activeButton,
            data: Object.values(this.activeHistoricalCurrencies["2024-04-02"]),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
