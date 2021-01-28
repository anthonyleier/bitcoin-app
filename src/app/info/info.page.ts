import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {GoogleChartInterface} from 'ng2-google-charts';

@Component({
	selector: 'app-info',
	templateUrl: './info.page.html',
	styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
	public title;
	public high;
	public low;
	public vol;
	public last;
	public buy;
	public sell;

	public dados = [];
	public valores = [];

	public tabela = [
		['Task', 'Hours per Day'],
		['1', 3],
		['2', 2],
		['3', 1],
	];

	public icone = 'star-outline';

	constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
		this.route.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				var data = this.router.getCurrentNavigation().extras.state.moeda;
				var vetor = this.router.getCurrentNavigation().extras.state.dados;
				this.tabela = [
					['Task', 'Hours per Day'],
					['1', 1],
					['2', 2],
					['3', 3],
				];
				this.title = data;
				this.atualizar(data, vetor);
			}
		});
	}

	atualizar(data: string, vetor) {
		this.apiService.getCoin(data).subscribe(data => {
			this.high = data['ticker']['high'];
			this.low = data['ticker']['low'];
			this.vol = data['ticker']['vol'];
			this.last = data['ticker']['last'];
			this.buy = data['ticker']['buy'];
			this.sell = data['ticker']['sell'];
		});

		this.dados = vetor;
		for (var i = 0; i < this.dados.length; i++) {
			this.valores[i] = parseInt(this.dados[i]);
		}
	}

	public graph: GoogleChartInterface = {
		chartType: 'LineChart',
		dataTable: this.tabela,
	};

	favoritar() {
		if (this.icone == 'star') this.icone = 'star-outline';
		else this.icone = 'star';
	}

	ngOnInit() {}
}
