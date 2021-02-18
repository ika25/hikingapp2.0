import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps'; 
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  map: GoogleMap;

  constructor(private platform:Platform) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD6wz-2LPTEqkqAtgA_0Mk-IIraeM7WvoQ',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD6wz-2LPTEqkqAtgA_0Mk-IIraeM7WvoQ'
    });

    

    this.map = GoogleMaps.create('map_canvas');
 
  }

}
