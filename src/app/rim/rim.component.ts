import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@core/firestore.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument  } from 'angularfire2/firestore';
import * as popup from 'ol-popup';
import * as ol from 'openlayers';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { MapData } from '../map-data';

let map: ol.Map;
let vectorSource: ol.source.Vector;
let vectorLayer: ol.layer.Vector;
const iconFeature: ol.Feature[] = [];
const coord: number[] = [0, 0];
const geoLoc: ol.Feature = new ol.Feature();
const geoLocAcc: ol.Feature = new ol.Feature();
const view: ol.View = new ol.View({
  center: ol.proj.fromLonLat([-98.583333, 39.833333]), // Continental US geographical center
  zoom: 5,
  minZoom: 2,
  maxZoom: 20
});
const geo: ol.Geolocation = new ol.Geolocation({projection: view.getProjection()});
const pointStyle: ol.style.Style = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
});


@Component({
  selector: 'app-rim',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.scss']
})

export class RimComponent implements OnInit {

  ref: AngularFirestoreCollection<MapData>;
  items: Observable<MapData[]>;

  bing: ol.source.Tile;
  osm: ol.source.Tile = new ol.source.OSM();
  mapTile: ol.source.Tile;
  mapType: string = 'AerialWithLabels';

  constructor(public db: FirestoreService) { }

  static displayCoord(): void {
    const tCoord: ol.Coordinate = geo.getPosition();
    coord[0] = tCoord[0];
    coord[1] = tCoord[1];
    map.getView().animate({center: tCoord, zoom: 19});
    geoLoc.setId(1);
    geoLoc.setGeometry(new ol.geom.Point(tCoord));
  }

  static getPoint(point: number[]): [number, number] {
    return [point[0], point[1]];
  }

  static displayData(points: MapData[]): void {
    const feats: ol.Feature[] = [];
    points.forEach((point: MapData) => {
      const index: number = feats.push(new ol.Feature({
        geometry: new ol.geom.Point(RimComponent.getPoint(
          ol.proj.fromLonLat([point.geo.longitude, point.geo.latitude])
        ))
      }));
      feats[index - 1].setStyle(pointStyle);
      feats[index - 1].setId(point.id);
    });
    vectorSource.addFeatures(feats);
  }

  ngOnInit(): void {

    geoLoc.setStyle(pointStyle);

    geo.setTracking(true);
    geo.on('change', RimComponent.displayCoord);
    geo.on('change:accuracyGeometry', () => {
      geoLocAcc.setGeometry(geo.getAccuracyGeometry());
    });

    const iconStyle: ol.style.Style = new ol.style.Style({
      image: new ol.style.Icon({
        size: [75, 130],
        offset: [30, 0],
        opacity: 1,
        scale: 0.3,
        src: '/assets/map-marker.png'
      })
    });

    vectorSource = new ol.source.Vector({
      features: iconFeature,
      wrapX: false
    });

    vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    this.bing = new ol.source.BingMaps({
      key: 'AiAluY_hnHv9UZ62xoML_5HOttjZbgQeeb_d1Wr7iE7J3vn4RZbeb91chqUve14D', // TODO: proper production keys
      imagerySet: this.mapType
    });

    this.mapTile = this.bing;

    map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults().extend([
        new ol.control.FullScreen()
      ]),
      interactions: ol.interaction.defaults().extend([
        new ol.interaction.DragRotateAndZoom()
      ]),
      layers: [
        new ol.layer.Tile({
          preload: Infinity,
          source: this.mapTile
        }),
        vectorLayer
      ],
      view: view
    });

    vectorSource.addFeature(geoLoc);
    vectorSource.addFeature(geoLocAcc);

    this.items = this.db.colWithIds$('tester');
    this.items.do(RimComponent.displayData).subscribe();
  }
}

// Switch between OpenStreetMap and Bing Maps
export function changeMapSource(tileSet: string): void {
  if (tileSet === 'osm') {
    this.mapTile = this.osm;
  } else if (tileSet === 'bing') {
    this.mapTile = this.bing;
  }
}

// Switch views in Bing Maps
export function changeMapType(typeSet: string): void {
  if (typeSet === 'aerial') {
    this.mapType = 'AerialWithLabels';
  } else if (typeSet === 'road') {
    this.mapType = 'Road';
  }
}
