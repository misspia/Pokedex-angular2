import { Component } from '@angular/core';
import { MainListComponent } from './main-list/main-list.component';
import { QuickviewComponent } from './quickview/quickview.component';
import { QuickviewService } from './quickview/quickview.service';

@Component({
  selector: 'app-root', //html tag name
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [MainListComponent, QuickviewComponent], //http://stackoverflow.com/a/39688549
  providers: [QuickviewService]
})
export class AppComponent {
	pkId: String; 
	title = 'le pokedex';

	constructor(quickviewService: QuickviewService) {
		this.pkId = "n151";
		quickviewService.getSummary(this.pkId).subscribe( (data)=>{
			console.log(data);
		})
	}


}

// https://youtu.be/_-CD_5YhJTA?t=34m2s