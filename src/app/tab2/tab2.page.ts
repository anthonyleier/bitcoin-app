import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {GoogleChartInterface} from 'ng2-google-charts';
import {NavigationExtras} from '@angular/router';
import {Router} from '@angular/router';
import {ThrowStmt} from '@angular/compiler';

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
	public loading;

	public dados = [];

	constructor(private apiService: ApiService, private router: Router) {
		this.getCoin();
		this.loading = 'none';
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

	async getMensal(moeda) {
		var data = new Date();
		var dia = data.getDate();
		var diaAnterior = dia - 1;
		for (var i = 0; i < diaAnterior; i++) {
			const response = await this.apiService.getMensal(moeda, i);
			const json = await response.json();
			this.dados[i] = json.avg_price;
		}
		console.log(this.dados);
	}

	async infoPage(moeda) {
		this.loading = 'block';
		await this.getMensal(moeda);
		console.log(this.dados);
		let navigationExtras: NavigationExtras = {
			state: {
				moeda: moeda,
				dados: this.dados,
			},
		};
		this.router.navigate(['info'], navigationExtras);
		this.loading = 'none';
	}
}
