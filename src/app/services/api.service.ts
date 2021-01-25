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
	getDolar(){
        let urlDolar = 'https://economia.awesomeapi.com.br/all/USD-BRL';
        return this.http.get(urlDolar);
    }
	/*funcao pegar data atual*/
	getData(moeda: string) {
		var valorMensal	;
		var data = new Date();
		var dia = data.getDate();
		var mes = data.getMonth() + 1;
		var ano = data.getFullYear();
		let url = this.API_URL + moeda + '/day-summary/'+ ano + '/'+ mes + '/' + (dia-1);
		return this.http.get(url);
	/*	for(var i=1; i>dia;i++){
			let url = this.API_URL + moeda + '/day-summary/'+ ano + '/'+ mes + '/' + i;
			valorMensal[i]=  this.http.get(url);
		}
	*/
	//	return this.http.get('https://www.mercadobitcoin.net/api/BTC/day-summary/2020/12/20/');
		
	}

	
}
