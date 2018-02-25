import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { FirestoreService } from '@core/firestore.service';

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
