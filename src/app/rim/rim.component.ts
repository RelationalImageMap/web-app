import {Component, OnInit} from '@angular/core';
import * as ol from 'openlayers';

let map: ol.Map;
const iconFeature: ol.Feature[] = [];
let vectorSource: ol.source.Vector;
let vectorLayer: ol.layer.Vector;
const coord: number[] = [0, 0];
const feat = new ol.Feature();
const accFeat = new ol.Feature();
const view = new ol.View({
  center: ol.proj.fromLonLat([-98.583333, 39.833333]), // Continental US geographical center
  zoom: 5,
  minZoom: 2,
  maxZoom: 20
});
const geo = new ol.Geolocation({projection: view.getProjection()});


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

  static displayCoord() {
    const tCoord = geo.getPosition();
    coord[0] = tCoord[0];
    coord[1] = tCoord[1];
    map.getView().animate({center: tCoord, zoom: 19});
    feat.setId(1);
    feat.setGeometry(new ol.geom.Point(tCoord));
  }

  ngOnInit() {

    feat.setStyle(new ol.style.Style({
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
    }));

    geo.setTracking(true);
    geo.on('change', RimComponent.displayCoord);
    geo.on('change:accuracyGeometry', function() {
      accFeat.setGeometry(geo.getAccuracyGeometry());
    });

    const iconStyle = new ol.style.Style({
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

    vectorSource.addFeature(feat);
    vectorSource.addFeature(accFeat);
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
