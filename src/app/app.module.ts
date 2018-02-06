import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialDesignModule} from './material-design/material-design.module';

import 'hammerjs';
import { RimComponent } from './rim/rim.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RimComponent
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
