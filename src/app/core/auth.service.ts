import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { User, AuthProvider, UserCredential } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from '@core/firestore.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface CustomUser {
  uid:            string;
  email:          string;
  photoURL?:      string;
  displayName?:   string;
}

@Injectable()
export class AuthService {

  user: Observable<CustomUser>;

  constructor(private afAuth: AngularFireAuth,
              private st: FirestoreService) {

    this.user = this.afAuth.authState.switchMap((user: User) => {
      if (user) {
        return this.st.doc$<CustomUser>(`users/${user.uid}`);
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: AuthProvider): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential: UserCredential) => {
        this.updateUserData(credential.user);
      });
  }

  private updateUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<CustomUser> =
                    this.st.doc<CustomUser>(`users/${user.uid}`);
    const data: CustomUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }

}
