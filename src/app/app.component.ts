import { Component } from '@angular/core';
import { MainListComponent } from './main-list/main-list.component';
import { QuickviewComponent } from './quickview/quickview.component';

@Component({
  selector: 'app-root', //html tag name
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [MainListComponent, QuickviewComponent] //http://stackoverflow.com/a/39688549
})
export class AppComponent {
	pkId: String; 
	title = 'le pokedex';

	constructor() {
		this.pkId = "n151";
	}
}

// https://youtu.be/_-CD_5YhJTA?t=34m2s