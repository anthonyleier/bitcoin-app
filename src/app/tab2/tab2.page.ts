import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {GoogleChartInterface} from 'ng2-google-charts';
import {NavigationExtras} from '@angular/router';
import {Router} from '@angular/router';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
	public bitcoinValue;
	public ethereumValue;
	public bitcoinCashValue;
	public chilizValue;
	public chainlinkValue;
	public litecoinValue;
	public paxGoldValue;
	public usdCoinValue;
	public wibxValue;
	public xrpValue;

	public bitcoinData = [];
	public ethereumData;
	public bitcoinCashData;
	public chilizData;
	public chainlinkData;
	public litecoinData;
	public paxGoldData;
	public usdCoinData;
	public wibxData;
	public xrpData;

	public bitcoinString;

	constructor(private apiService: ApiService, private router: Router) {
		this.getCoin();
		this.getMensal();
	}
	getCoin() {
		this.apiService.getCoin('BTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.bitcoinValue = valorVenda;
		});

		this.apiService.getCoin('ETH').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.ethereumValue = valorVenda;
		});
		this.apiService.getCoin('BCH').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.bitcoinCashValue = valorVenda;
		});
		this.apiService.getCoin('CHZ').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.chilizValue = valorVenda;
		});
		this.apiService.getCoin('LINK').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.chainlinkValue = valorVenda;
		});
		this.apiService.getCoin('LTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.litecoinValue = valorVenda;
		});
		this.apiService.getCoin('PAXG').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.paxGoldValue = valorVenda;
		});
		this.apiService.getCoin('USDC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.usdCoinValue = valorVenda;
		});
		this.apiService.getCoin('WBX').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.wibxValue = valorVenda;
		});
		this.apiService.getCoin('XRP').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			this.xrpValue = valorVenda;
		});
	}

	getMensal() {
		var data = new Date();
		var dia = data.getDate();
		var diaAnterior = dia - 1;

		for (var i = 1; i <= diaAnterior; i++) {
			this.apiService.getMensal('BTC', i).subscribe(data => {
				this.bitcoinData.push(data['avg_price']);
				this.bitcoinString = JSON.stringify(this.bitcoinData);
			});
		}
	}

	public pieChart: GoogleChartInterface = {
		chartType: 'LineChart',
		dataTable: [
			['Task', 'Hours per Day'],
			['Work', 50],
			['Eat', 2],
			['Commute', 33],
			['Watch TV', 5],
			['Sleep', 7],
		],
		//firstRowIsData: true,
		options: {title: 'Tasks'},
	};

	public candlestickChart: GoogleChartInterface = {
		chartType: 'CandlestickChart',
		dataTable: [
			['Hora', 'Valor', '1', '2', '3'],
			['10 am', 1, 20, 1, 1],
			['11 am', 1, 1, 20, 1],
			['12 am', 1, 1, 1, 20],
			['1 pm', 20, 1, 1, 1],
			['2 pm', 1, 27, 9, 10],
			['3 pm', 1, 37, 9, 10],
			['4 pm', 1, 60, 9, 10],
			['5 pm', 1, 75, 9, 10],
		],
		//firstRowIsData: true,
		options: {title: 'Tasks'},
	};

	public graficoBitcoin: GoogleChartInterface = {
		chartType: 'LineChart',
		dataTable: [
			['Data', 'Preço'],
			[this.bitcoinData[0], parseInt(this.bitcoinData[1])],
			[this.bitcoinData[2], parseInt(this.bitcoinData[3])],
		],
		//firstRowIsData: true,
		options: {title: 'Tasks'},
	};

	infoPage(moeda: string) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				special: moeda,
			},
		};
		this.router.navigate(['info'], navigationExtras);
	}
}
