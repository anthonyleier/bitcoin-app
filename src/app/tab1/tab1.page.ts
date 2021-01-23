import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	public cbMoeda1;
	public cbMoeda2;
	public edtValor1;
	public edtValor2;
	public resultado;

	constructor(private apiService: ApiService) {}

	public onCalcularClick() {
		var moeda = this.cbMoeda1 || 'BTC';
		this.apiService.getCoin(moeda).subscribe(data => {
			var cotacaoAtual = data['ticker']['sell'];
			cotacaoAtual = parseFloat(cotacaoAtual).toFixed(2);
			this.resultado = cotacaoAtual * this.edtValor1;
			if (this.cbMoeda2 == 'dolar') {
				this.apiService.getDolar().subscribe(data => {
					var dolar = data['USD']['bid'];
					this.resultado = this.resultado * dolar;		
					this.edtValor2 = this.resultado;
					console.log('Resultado: ', this.resultado);
				});
			}else{
				this.edtValor2 = this.resultado;
				console.log('Resultado: ', this.resultado);
			}
		});
	}
}
