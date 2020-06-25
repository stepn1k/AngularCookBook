import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import AppRoutingModule from "./app-routing.module";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
