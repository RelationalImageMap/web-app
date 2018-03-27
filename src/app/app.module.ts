import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialDesignModule } from './material-design/material-design.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '@core/core.module';
import { environment } from '@environments/environment';

import { AngularFireModule } from 'angularfire2';
import { RimComponent } from './rim/rim.component';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RimComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    MaterialDesignModule,
    AngularFireModule.initializeApp(environment.firebase, 'test_proj'),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
