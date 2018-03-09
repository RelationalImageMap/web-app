import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@core/firestore.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument  } from 'angularfire2/firestore';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { MapData } from '../map-data';

@Component({
  selector: 'app-rim',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.scss']
})

export class RimComponent implements OnInit {

  ref: AngularFirestoreCollection<MapData>;
  items: Observable<MapData[]>;

  lat: number = 39.833333;
  lng: number = -98.583333;

  constructor(public db: FirestoreService) { }

  // static displayCoord(): void {

  // }

  // static getPoint(point: number[]): [number, number] {
  //   return [point[0], point[1]];
  // }

  // static displayData(points: MapData[]): void {

  // }

  ngOnInit(): void {

    this.trackUserLocation();

    this.items = this.db.colWithIds$('tester');
    // this.items.do(RimComponent.displayData).subscribe();
  }

  private trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos: Position) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      });
    }
  }
}
