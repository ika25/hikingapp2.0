import { Component, NgZone, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, NavParams, LoadingController } from '@ionic/angular';
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator/ngx";
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: true }) mapEle: ElementRef;

  @Input() lat: any;
  @Input() lng: any;
  @Input() type: any;

  map: any;
  marker: any;
  address: any;

  constructor(
    private modalController: ModalController, private ngZone: NgZone, private navParams: NavParams,
    private launchNav: LaunchNavigator,
    private nativeCoder: NativeGeocoder,
    private loading: LoadingController
    ) {
    
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadmap(this.lat, this.lng, this.mapEle);
  }

  loadmap(lat, lng, mapElement) {
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();

    const location = new google.maps.LatLng(lat, lng);
    const style = [
      {
        featureType: 'poi',
        elementType: 'all',
      }
    ];

    const mapOptions = {
      zoom: 17,
      streetViewControl: false,
      zoomControl: true,
      overviewMapControl: false,
      center: location,
      mapTypeControl: false,
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
    this.addMarker(location);
    this.geocodeLatLng(geocoder, this.map, infowindow); // get address

    let thisObj = this;
    this.map.addListener('click', (e) => { // move marker to position clicked
      thisObj.marker.setPosition(e.latLng);
      this.getPosition();
      this.geocodeLatLng(geocoder, this.map, infowindow); // get address
    });
    
  }

  addMarker(location) {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });
  }

  /**
   * find address from lat, lng
   * @param geocoder 
   * @param map 
   * @param infowindow 
   */
  async geocodeLatLng(geocoder, map, infowindow) {
    await this.loading.create({
      message: 'Finding address...',
      duration: 10000,
      mode: 'ios',
      spinner: 'crescent'
    }).then(load => load.present());

    const latlng = {
      lat: this.lat,
      lng: this.lng,
    };
    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        this.loading.dismiss();
        if (response.results[0]) {
          // map.setZoom(11);
          // const marker = new google.maps.Marker({
          //   position: latlng,
          //   map: map,
          // });
          // infowindow.setContent(response.results[0].formatted_address);
          // infowindow.open(map, marker);
          this.address = response.results[0].formatted_address
        } else {
          // window.alert("No results found");
          console.error("No results found");
        }
      })
      .catch((e) => {
        this.loading.dismiss();
        // window.alert("Geocoder failed due to: " + e)
        console.error("Geocoder failed due to: " + e);
      });
  }

  /**
   * get lat, lng from marker position
   */
  getPosition() {
    let position = this.marker.getPosition();
    this.lat = position.lat();
    this.lng = position.lng();
  }
  /**
   * returns lat, lng, address for start/end point
   */
  setPosition() {
    this.modalController.dismiss({
      location: this.address,
      lat: this.lat,
      lng: this.lng
    }, 'selected');
  }

  closeModal() {
    this.modalController.dismiss();
  }
  /**
   * launch navigator map
   */
  NavToLocation() {
    let options: LaunchNavigatorOptions = {
      start: 'London, ON'
    }

    this.launchNav.navigate([
      this.lat,
      this.lng
    ]);

    // window.open(`geo:${this.lat},${this.lng}?q=address`, '_system');
  }
}
