import { Component, OnInit } from '@angular/core'; 
import { GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps";

import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage   {

  constructor(public platform: Platform) { }

  ngAfterViewInit() {
		this.platform.ready().then(() => this.loadMap());
  }
  
  loadMap() {
		/* The create() function will take the ID of your map element */
		const map = GoogleMaps.create('map');

		map.one( GoogleMapsEvent.MAP_READY ).then((data: any) => {
			const coordinates: LatLng = new LatLng(53.2734, -7.77832031);

			map.setCameraTarget(coordinates);
			map.setCameraZoom(8);
		});
	}

}