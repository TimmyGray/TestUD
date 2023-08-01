import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { PaginatorComponent } from './templates/paginator/paginator.component';
import { OptionsListComponent } from './templates/options-list/options-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestcomponentComponent,
    PaginatorComponent,
    OptionsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
