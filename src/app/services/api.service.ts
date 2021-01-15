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
}
