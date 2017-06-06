import { Component } from '@angular/core';
import { MainListComponent } from './main-list/main-list.component';
// import { PreviewCardComponent } from './preview-card/preview-card.component';

@Component({
  selector: 'app-root', //html tag name
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [MainListComponent] //http://stackoverflow.com/a/39688549
})
export class AppComponent {
	pkId: String<pkId>; 
	title = 'le pokedex';

	constructor() {
		this.pkId = "n1";
	}
}

// https://youtu.be/_-CD_5YhJTA?t=34m2s