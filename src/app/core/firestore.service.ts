import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T>        = string | AngularFirestoreDocument<T>;

  @Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).valueChanges();
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).valueChanges();
  }

  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().map(
      (actions: DocumentChangeAction[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    });
  }

}
