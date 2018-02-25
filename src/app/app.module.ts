import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialDesignModule} from './material-design/material-design.module';

import 'hammerjs';
import { RimComponent } from './rim/rim.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '@environments/environment';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RimComponent
  ],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    AngularFireModule.initializeApp(environment.firebase, 'test_proj'),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
