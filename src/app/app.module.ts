import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialDesignModule} from './material-design/material-design.module';

import 'hammerjs';
import { RimComponent } from './rim/rim.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MapDataService } from './shared/map-data.service';
import { AuthService } from './shared/auth.service';


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
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [MapDataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
