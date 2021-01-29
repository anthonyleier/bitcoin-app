import {Component, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {Router} from '@angular/router';

@Component({
	selector: 'app-new',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
	constructor(private router: Router) {}

	public cbMoeda;
	public edtValor;

	ngOnInit() {}

	salvar() {
		let moeda = this.cbMoeda || 'BTC';
		let valor = this.edtValor || 10;
		let navigationExtras: NavigationExtras = {
			state: {
				moeda: moeda,
				valor: valor,
			},
		};
		this.router.navigate(['tabs/tab3'], navigationExtras);
	}
}
