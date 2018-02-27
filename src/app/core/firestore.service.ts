import { Injectable } from '@angular/core';
import { DocumentData } from '@firebase/firestore-types';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  QueryFn } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T>        = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn).valueChanges();
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).valueChanges();
  }

  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().map(
      (actions: DocumentChangeAction[]) => {
        return actions.map((a: DocumentChangeAction) => {
          const data: DocumentData = a.payload.doc.data();
          const id: string = a.payload.doc.id;
          return { id, ...data };
        });
    });
  }

}
