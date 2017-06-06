import { Component, OnInit, Input } from '@angular/core';
import { QuickviewService } from './quickview.service';

@Component({
	selector: 'app-quickview',
	templateUrl: './quickview.component.html',
	styleUrls: ['./quickview.component.scss'],
	inputs: ['pkId'],
	providers: [QuickviewService]
})
export class QuickviewComponent implements OnInit {
	@Input() pkId;

	constructor(quickviewService: QuickviewService) {
		console.log(this.pkId)
		// quickviewService.getSummary(this.pkId).subscribe( (data) => {
		// 	console.log(data)
		// })
	}
	ngOnInit() {
		console.log(this.pkId);


	}

}
