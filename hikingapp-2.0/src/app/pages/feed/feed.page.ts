import { Component, OnInit } from '@angular/core';
import {ViewChild,ElementRef} from '@angular/core';

 declare var google: any;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  map: any;

  // @ViewChild('map',{read: ElementRef, static: false}) mapRef: ElementRef;
  @ViewChild('map') mapRef: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    const location= new google.maps.LatLng(-17.824858,31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    console.log(location, options);
    debugger;
    this.map=new google.maps.Map(this.mapRef.nativeElement,options);
    console.log(this.map);
    
  }

}
