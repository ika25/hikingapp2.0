import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {

    slideOpts = { 
    speed: 400
  };
  

  constructor(private route: Router) { }

  ngOnInit() {}

  navigateToLogin(){
    console.log('********navigate to login*****');
    this.route.navigate(['/login']);
  }

  navigateToRegister(){
    this.route.navigate(['/signup']);
  }

}
