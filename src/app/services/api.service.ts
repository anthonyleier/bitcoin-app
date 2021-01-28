import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	private API_URL = 'https://www.mercadobitcoin.net/api/';
	constructor(private http: HttpClient) {}

	getCoin(moeda: string) {
		let url = this.API_URL + moeda + '/ticker/';
		return this.http.get(url);
	}

	getDolar() {
		let urlDolar = 'https://economia.awesomeapi.com.br/all/USD-BRL';
		return this.http.get(urlDolar);
	}

	getMensal(moeda: string, dia: number) {
		var data = new Date();
		var mes = data.getMonth() + 1;
		var ano = data.getFullYear();
		let url = this.API_URL + moeda + '/day-summary/' + ano + '/' + mes + '/' + dia;
		return this.http.get(url);
	}

	getMensalTurbo(moeda: string, dia: number) {
		var data = new Date();
		var mes = data.getMonth() + 1;
		var ano = data.getFullYear();
		let url = this.API_URL + moeda + '/day-summary/' + ano + '/' + mes + '/' + dia;
		return fetch(url);
	}
}
