import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user/user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private storage: Storage,
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.geolocation.getCurrentPosition().then(geo => {
        this.userService.lat = geo.coords.latitude
        this.userService.lng = geo.coords.longitude
      });
      var user = await this.storage.get('u_data');
      console.log('-----start-----');
      console.log(user);
      if (user) {
        this.userService.user = user;
        this.navCtrl.navigateRoot('home/calories');

      } else {
        this.navCtrl.navigateRoot('login')
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
