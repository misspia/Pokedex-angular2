import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainListComponent } from './main-list/main-list.component';
import { LeadingZeroPipe } from './filters/leading-zero.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    LeadingZeroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
