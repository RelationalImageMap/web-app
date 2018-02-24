import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GeoPoint } from '@firebase/firestore-types';

export interface MapData {
  geo: GeoPoint;
  imageUrl: string;
  id?: string;
}

@Injectable()
export class MapDataService {

  itemCollection: AngularFirestoreCollection<MapData>;
  items: Observable<MapData[]>;

  constructor(private st: AngularFirestore) { }

  getStorage(): AngularFirestore {
    return this.st;
  }

  addItem(item: any): void {
    this.itemCollection.add(item);
  }

}
