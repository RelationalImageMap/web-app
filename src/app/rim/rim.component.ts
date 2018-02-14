import {Component, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/map';
// import View from 'ol/view';
// import TileLayer from 'ol/layer/tile';
// import XYZSource from 'ol/source/xyz';
import Tile from 'ol/source/tile';
import Point from 'ol/geom/point';
import Feature from 'ol/feature';
import Vector from 'ol/source/vector';
import {Vector as VectorLayer} from 'ol/layer/vector';
// import proj from 'ol/proj';

declare var ol: any;
let map: Map;
const iconFeature: Feature[] = [];
let vectorSource: Vector;
let vectorLayer: VectorLayer;
const coord: Number[] = [0, 0];

@Component({
  selector: 'app-rim',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.css']
})

export class RimComponent implements OnInit {


  bing: Tile;
  osm: Tile = new ol.source.OSM();
  mapTile: Tile;
  mapType = 'AerialWithLabels';

  constructor() {
  }

  static displayCoord(pos) {
    const tCoord = ol.proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]);
    coord[0] = tCoord[0];
    coord[1] = tCoord[1];
    map.getView().animate({center: coord, zoom: 17});
    vectorSource.addFeature(new Feature({
      geometry: new Point(coord)
    }));
  }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(RimComponent.displayCoord);

    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon(({
        size: [75, 130],
        offset: [30, 0],
        opacity: 1,
        scale: 0.3,
        src: '/assets/map-marker.png'
      }))
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
      view: new ol.View({
        center: new ol.proj.fromLonLat([-98.583333, 39.833333]), // Continental US geographical center
        zoom: 5,
        minZoom: 2,
        maxZoom: 20
      })
    });
  }
}

// Switch between OpenStreetMap and Bing Maps
export function changeMapSource(tileSet: string) {
  if (tileSet === 'osm') {
    this.mapTile = this.osm;
  } else if (tileSet === 'bing') {
    this.mapTile = this.bing;
  }
}

// Switch views in Bing Maps
export function changeMapType(typeSet: string) {
  if (typeSet === 'aerial') {
    this.mapType = 'AerialWithLabels';
  } else if (typeSet === 'road') {
    this.mapType = 'Road';
  }
}
