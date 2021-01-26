import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';

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

	public icone = 'star-outline';

	constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
		this.route.queryParams.subscribe(params => {
			if (params && params.special) {
				var data = params.special;
				this.title = data;
				this.atualizar(data);
			}
		});
	}

	atualizar(data: string) {
		this.apiService.getCoin(data).subscribe(data => {
			this.high = data['ticker']['high'];
			this.low = data['ticker']['low'];
			this.vol = data['ticker']['vol'];
			this.last = data['ticker']['last'];
			this.buy = data['ticker']['buy'];
			this.sell = data['ticker']['sell'];
		});
	}

	favoritar() {
		if (this.icone == 'star') this.icone = 'star-outline';
		else this.icone = 'star';
	}

	ngOnInit() {}
}
