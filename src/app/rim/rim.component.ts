import {Component, OnInit} from '@angular/core';
import * as ol from 'openlayers';

let map: ol.Map;
const iconFeature: ol.Feature[] = [];
let vectorSource: ol.source.Vector;
let vectorLayer: ol.layer.Vector;
const coord: Number[] = [0, 0];

@Component({
  selector: 'app-rim',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.css']
})

export class RimComponent implements OnInit {


  bing: ol.source.Tile;
  osm: ol.source.Tile = new ol.source.OSM();
  mapTile: ol.source.Tile;
  mapType = 'AerialWithLabels';

  constructor() {
  }

  static displayCoord(pos) {
    const tCoord = ol.proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]);
    coord[0] = tCoord[0];
    coord[1] = tCoord[1];
    map.getView().animate({center: tCoord, zoom: 19});
    vectorSource.addFeature(new ol.Feature({
      geometry: new ol.geom.Point(tCoord)
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
        center: ol.proj.fromLonLat([-98.583333, 39.833333]), // Continental US geographical center
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
