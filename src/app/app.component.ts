import { Component } from '@angular/core';
import { MainListComponent } from './main-list/main-list.component';
import { PreviewCardComponent } from './preview-card/preview-card.component';

@Component({
  selector: 'app-root', //html tag name
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [MainListComponent, PreviewCardComponent] //http://stackoverflow.com/a/39688549
})
export class AppComponent {
  title = 'le pokedex';
}

// https://youtu.be/_-CD_5YhJTA?t=34m2s