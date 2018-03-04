import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FirestoreService } from '@core/firestore.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { SearchService } from './search.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthService,
    FirestoreService,
    SearchService
  ]
})
export class CoreModule { }
