import {Component, OnInit} from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Chart} from 'chart.js';
import {GoogleChartInterface} from 'ng2-google-charts';
import {NavigationExtras} from '@angular/router';

@Component({
	selector: 'app-info',
	templateUrl: './info.page.html',
	styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
	@ViewChild('lineCanvas') private lineCanvas: ElementRef;
	lineChart: any;

	public title;
	public high;
	public low;
	public vol;
	public last;
	public buy;
	public sell;

	public dados = [];
	public valores = [];
	public diasMes = [];

	public icone = 'star-outline';

	ngAfterViewInit() {
		this.lineChartMethod();
	}

	constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
		this.route.queryParams.subscribe(params => {
			if (this.router.getCurrentNavigation().extras.state) {
				var data = this.router.getCurrentNavigation().extras.state.moeda;
				var vetor = this.router.getCurrentNavigation().extras.state.dados;
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

		var dia = new Date();
		var diaAtual = dia.getDate();
		var diaAnterior = diaAtual - 1;

		for (i = 0; i < diaAnterior - 1; i++) {
			this.diasMes[i] = i + 1;
		}
	}

	favoritar() {
		if (this.icone == 'star') this.icone = 'star-outline';
		else this.icone = 'star';
	}
	voltar(){
		let navigationExtras: NavigationExtras = {
			state: {},
		};
		this.router.navigate(['tabs/tab2'], navigationExtras);
	}

	ngOnInit() {}

	lineChartMethod() {
		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
			data: {
				labels: this.diasMes,
				datasets: [
					{
						label: 'Variação do Preço no Mês',
						fill: false,
						lineTension: 0.1,
						backgroundColor: 'rgba(75,192,192,0.4)',
						borderColor: 'rgba(75,192,192,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(75,192,192,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(75,192,192,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: this.valores,
						spanGaps: false,
					},
				],
			},
		});
	}
}
