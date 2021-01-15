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

	getCoin(){
		this.apiService.getCoin('BTC').subscribe(data => {
			var valorVenda = data['ticker']['sell'];
			valorVenda = parseFloat(valorVenda).toFixed(2);
			console.log(valorVenda);
			this.bitcoinValue = valorVenda;
		})
	}
}
