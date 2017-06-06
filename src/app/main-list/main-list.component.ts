import { Component, OnInit } from '@angular/core';
import { MainListService } from './main-list.service'; 
import { QuickviewComponent } from '../quickview/quickview.component'

@Component({
	selector: 'app-main-list',
	templateUrl: './main-list.component.html',
	styleUrls: ['./main-list.component.scss', './pkmn-icons.css'],
	providers: [MainListService],
	entryComponents: [QuickviewComponent]
})
export class MainListComponent implements OnInit {
	mainList;
	constructor(mainListService: MainListService) { 
		mainListService.getList().subscribe( (data)=>{
			console.log("DATA");
			console.log(data);
			this.mainList = data;
		})
	}
	


	ngOnInit() {
	}

}
