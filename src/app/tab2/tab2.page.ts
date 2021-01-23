import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
	constructor(private apiService: ApiService) {
		this.getCoin();
	}
	public bitcoinValue;
	getCoin(){
		this.apiService.getCoin('BTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log(valorVenda);
			this.bitcoinValue = valorVenda;
		})
	}
	public pieChart: GoogleChartInterface = {
		chartType: 'LineChart',
		dataTable: [
		  ['Task', 'Hours per Day'],
		  ['Work',     11],
		  ['Eat',      2],
		  ['Commute',  3],
		  ['Watch TV', 5],
		  ['Sleep',    7]
		],
		//firstRowIsData: true,
		options: {'title': 'Tasks'},
	  };

	  public candlestickChart : GoogleChartInterface = {
		chartType: 'CandlestickChart',
		dataTable: [
		  ['Hora', 'Valor', '1', '2', '3'],
		  ['10 am', 1 , 22, 3 , 44],
		  ['11 am', 2, 54, 7, 9],
		  ['12 am', 1, 35, 40, 23],
		  ['1 pm', 1, 42, 9, 10],
		  ['2 pm', 1, 27, 9, 10],
		  ['3 pm', 7, 37, 9, 10],
		  ['4 pm', 7, 60, 9, 10],
		  ['5 pm', 7, 75, 9, 10]
		],
		//firstRowIsData: true,
		options: {'title': 'Tasks'},
	  };
}
