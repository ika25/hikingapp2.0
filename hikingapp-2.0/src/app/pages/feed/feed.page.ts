import { Component, ViewChild, ElementRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController,	LoadingController, } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//import	{	GoogleMapComponent	}	from	'../../components/google-map/google-map.component'; 
//This is used to facilitate the user to track the journey. 
//user is provided with button to start and stop the journey. 
//Latitute and Longitudes are captured and saved into firestore
const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  // Firebase Data
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;

  // Map related
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  loc : any;
  
  // Misc
  isTracking = false;
  watch: string;
  user = null;
  
  constructor(private route: Router,private afs: AngularFirestore) {
    this.anonLogin();
  }
  
  ionViewWillEnter() {
    this.loadMap();
  }


  // Perform an anonymous login and load data
  anonLogin() {
    firebase.auth().onAuthStateChanged(user => { 
      this.user = user;

       
      console.log('userid is  '+this.user)
      
    if (this.user === null) {
        console.log(user + ' === null . User has to login ');
        this.route.navigate(['login']);
        return;
    }
    if (this.user == null) {
      console.log(user + '  uid === null . User has to login ');
      this.route.navigate(['login']);
      return;
   }
 
 
      this.locationsCollection = this.afs.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );
 
      // Make sure we also get the Firebase item ID!
      this.locations = this.locationsCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
 
      // Update Map marker on every change
      this.locations.subscribe(locations => {
        this.updateMap(locations);
        this.loc=locations;
      });
    });
  }

  // Initialize a blank map
  loadMap() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true,  timeout: 100000 }).then((position) => {
      console.log(position);
      // let	latLng	=	new	google.maps.LatLng(46.064941,13.230720);
      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 13
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
    }, (err) => {

      console.log(err);
      
    });
    
  }

  // Use Capacitor to track our geolocation
  startTracking() {
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) => {
      if (position) {
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }

  // Unsubscribe from the geolocation watch using the initial ID
  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
    });
  }

  // Save a new location to Firebase and center the map
  addNewLocation(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat,
      lng,
      timestamp
    });
 
    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(13);
  }
 
  // Delete a location from Firebase
  deleteLocation(pos) {
    this.locationsCollection.doc(pos.id).delete();
  }

  // Redraw all markers on the map
  updateMap(locations) {
    // Remove all current marker
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];
 
    for (let loc of locations) {
      let latLng = new google.maps.LatLng(loc.lat, loc.lng);
 
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.markers.push(marker);
    }
}

}
