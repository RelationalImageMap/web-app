import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-rim',
  templateUrl: './rim.component.html',
  styleUrls: ['./rim.component.css']
})
export class RimComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }

}
