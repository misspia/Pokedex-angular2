import { Component, OnInit } from '@angular/core';
import { MainListService } from './main-list.service'; 

@Component({
	selector: 'app-main-list',
	templateUrl: './main-list.component.html',
	styleUrls: ['./main-list.component.css'],
	providers: [MainListService]
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
