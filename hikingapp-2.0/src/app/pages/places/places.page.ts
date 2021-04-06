import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Plugins } from '@capacitor/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import '@ungap/global-this';
const { Geolocation } = Plugins;

declare var google;

@Component({
	selector: 'app-places',
	templateUrl: './places.page.html',
	styleUrls: ['./places.page.scss'],
})

export class PlacesPage {

	// Map related
	@ViewChild('map') mapElement: ElementRef;
	map: any;
	markers = [];
	loc : any;

	autocomplete: { input: string; };
	autocompleteItems: any[];
	GoogleAutocomplete: any;
	placeid: any;

	infowindow : any;

	constructor(public zone: NgZone) {
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
	}

	ionViewWillEnter() {
		this.loadMap();
	}

	// Initialize a blank map
	loadMap() {
		Geolocation.getCurrentPosition({ enableHighAccuracy: true,  timeout: 100000 }).then((position) => {
		  //console.log(position);
		  
		  this.infowindow = new google.maps.InfoWindow(); 
		  const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		  const mapOptions = {
			center: latLng,
			zoom: 18
		  };
		  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
		  
		  var request = {
			location: latLng,
			radius: '500'
		  };
		  
		  var service = new google.maps.places.PlacesService(this.map);

		  service.nearbySearch(request, (results, status)=> {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
			  for (var i = 0; i < results.length; i++) {
				this.createMarker(results[i]);
				//console.log('result',results[i])
			  }
			  this.map.setCenter(results[0].geometry.location);
			}
		  });

		}, (err) => {
	
		  console.log(err);
		  
		});
		
	}

	// Redraw all markers on the map
	createMarker(place) {
		const marker = new google.maps.Marker({
		  map : this.map,
		  position: place.geometrylocation,
		});
	  
		google.maps.event.addListener(marker, "click", () => {
		  this.infowindow.setContent(place.name);
		  this.infowindow.open(this.map, marker);
		});
	}

	//AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
	UpdateSearchResults(){
		if (this.autocomplete.input == '') {
		  this.autocompleteItems = [];
		  return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
		(predictions, status) => {
		  this.autocompleteItems = [];
		  this.zone.run(() => {
			predictions.forEach((prediction) => {
			  this.autocompleteItems.push(prediction);
			});
		  });
		});
	}

	//lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
	ClearAutocomplete(){
		this.autocompleteItems = []
		this.autocomplete.input = ''
	}

	//wE CALL THIS FROM EACH ITEM.
	SelectSearchResult(item) {
		///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
		console.log(item);      
		this.placeid = item.place_id
        let request = {
			placeId: this.placeid
		};
		const service = new google.maps.places.PlacesService(this.map);
        service.getDetails(request, (place, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
			  var marker = new google.maps.Marker({
				map: this.map,
				position: place.geometry.location
			  });
			  this.map.setCenter(marker.getPosition());
			}

		});
	}

}
