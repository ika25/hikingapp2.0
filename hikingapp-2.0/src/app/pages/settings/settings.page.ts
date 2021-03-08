import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.services';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public user: UserService,
    private comService: CommonService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.comService.showLoader('')
    await this.afAuth.signOut();
    this.user.user = null;
    this.comService.hideLoader();
    this.navCtrl.navigateRoot('login');
  }

  goProfile() {
    this.navCtrl.navigateForward('home/profile');
  }

}
