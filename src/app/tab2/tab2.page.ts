import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';

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
	public ethereumValue;
	public bitcoinCashValue;
	public chilizValue;
	public chainlinkValue;
	public litecoinValue;
	public paxGoldValue;
	public usdCoinValue;
	public wibxValue;
	public xrpValue;

	getCoin() {
		this.apiService.getCoin('BTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('bitcoinValue: ', valorVenda);
			this.bitcoinValue = valorVenda;
		});

		this.apiService.getCoin('ETH').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('ethereumValue: ', valorVenda);
			this.ethereumValue = valorVenda;
		});
		this.apiService.getCoin('BCH').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('bitcoinCashValue: ', valorVenda);
			this.bitcoinCashValue = valorVenda;
		});
		this.apiService.getCoin('CHZ').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('chilizValue: ', valorVenda);
			this.chilizValue = valorVenda;
		});
		this.apiService.getCoin('LINK').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('chainlinkValue: ', valorVenda);
			this.chainlinkValue = valorVenda;
		});
		this.apiService.getCoin('LTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('litecoinValue: ', valorVenda);
			this.litecoinValue = valorVenda;
		});
		this.apiService.getCoin('PAXG').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('paxGoldValue: ', valorVenda);
			this.paxGoldValue = valorVenda;
		});
		this.apiService.getCoin('USDC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('usdCoinValue: ', valorVenda);
			this.usdCoinValue = valorVenda;
		});
		this.apiService.getCoin('WBX').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('wibxValue: ', valorVenda);
			this.wibxValue = valorVenda;
		});
		this.apiService.getCoin('XRP').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log('xrpValue: ', valorVenda);
			this.xrpValue = valorVenda;
		});
	}
}
