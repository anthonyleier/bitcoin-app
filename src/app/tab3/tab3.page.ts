import {Component} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Storage} from '@ionic/storage';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
	public listaInvest = [];

	constructor(private storage: Storage, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
		this.storage.get('investimentos').then(banco => {
			if (banco != null) this.listaInvest = banco;
		});
		this.atualizar();
		this.route.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				var moeda = this.router.getCurrentNavigation().extras.state.moeda;
				var valorInicial = this.router.getCurrentNavigation().extras.state.valor;
				var valorAtual = valorInicial;
				this.apiService.getCoin(moeda).subscribe(data => {
					var cotacaoInicial = data['ticker']['sell'];
					cotacaoInicial = parseFloat(cotacaoInicial).toFixed(2);
					this.inserir({moeda, cotacaoInicial, valorInicial, valorAtual});
				});
			}
		});
	}

	inserir(invest) {
		this.listaInvest.push(invest);
		this.storage.set('investimentos', this.listaInvest);
		this.atualizar();
	}

	atualizar() {
		for (let i = 0; i < this.listaInvest.length; i++) {
			this.apiService.getCoin(this.listaInvest[i].moeda).subscribe(data => {
				var valorVenda = data['ticker']['sell'];
				valorVenda = parseFloat(valorVenda).toFixed(2);
				let aumento = valorVenda / this.listaInvest[i].cotacaoInicial;
				this.listaInvest[i].valorAtual = this.listaInvest[i].valorInicial * aumento;
			});
		}
		if(this.listaInvest.length > 0) this.storage.set('investimentos', this.listaInvest);
	}

	novo() {
		let navigationExtras: NavigationExtras = {
			state: {},
		};
		this.router.navigate(['new'], navigationExtras);
	}
}
