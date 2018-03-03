import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirestoreService } from '@core/firestore.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [ AuthService, FirestoreService ]
})
export class CoreModule { }
