import {Component} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

	public listaInvest = [];

	constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
		this.route.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				var moeda = this.router.getCurrentNavigation().extras.state.moeda;
				var valorInicial = this.router.getCurrentNavigation().extras.state.valor;
				var valorAtual = valorInicial;
				this.inserir({moeda, valorInicial, valorAtual});
				this.atualizar();
			}
		});
	}

	inserir(invest){
		this.listaInvest.push(invest);
	}

	atualizar(){
		for(let i=0; i<this.listaInvest.length; i++){
			this.apiService.getCoin(this.listaInvest[i].moeda).subscribe(data => {
				var valorVenda = data['ticker']['sell'];
				valorVenda = parseFloat(valorVenda).toFixed(2);
				this.listaInvest[i].valorAtual = valorVenda * this.listaInvest[i].valorInicial;
			});
		}
	}

	novo() {
		let navigationExtras: NavigationExtras = {
			state: {},
		};
		this.router.navigate(['new'], navigationExtras);
	}
}
