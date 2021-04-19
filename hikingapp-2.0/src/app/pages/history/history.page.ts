import { Component, ViewChild, ElementRef } from '@angular/core';

import { Plugins } from '@capacitor/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})

// This page is to display the history of the trips
export class HistoryPage{

  user = null;

  // Map related
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];

  pathTravelled : any ;

  // Firebase Data
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;

  currentMapTrack = null;

  constructor(private afs: AngularFirestore) { 
    this.anonLogin();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  // Perform an anonymous login and load data
  anonLogin() {
    firebase.auth().onAuthStateChanged(user => { 
      this.user = user;
      
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
        this.redrawPath(locations);
      });
      
    });
  }

  // Initialize a blank map
  loadMap() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true,  timeout: 100000 }).then((position) => {
      //console.log(position);
      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const mapOptions = {
        center: latLng, 
        zoom: 3,
        //mapTypeId: "terrain"
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
    }, (err) => {

      console.log(err);
      
    });
    
  }

  redrawPath(locations) {
    const hikeCoordinates = [];
    for (let loc of locations) {
      hikeCoordinates.push({lat : loc.lat, lng : loc.lng});
    }
    
    console.log(hikeCoordinates);
      this.currentMapTrack = new google.maps.Polyline({
        path: hikeCoordinates,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    
  }

}