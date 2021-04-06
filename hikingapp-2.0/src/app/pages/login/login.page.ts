import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.services';
import '@ungap/global-this';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private route: Router,
    public alertController: AlertController,
    public user: UserService,
    public afAuth: AngularFireAuth,
    private comService: CommonService
  ) { }

  ngOnInit() {

    //this.route.navigate(['/home']);
  }


  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async validateLogin() {
    const { username, password } = this

    this.route.navigate(['home/calories'])
    return;

    try {
      await this.comService.showLoader('')
      const res = await this.afAuth.signInWithEmailAndPassword(username, password)
      console.log('res == ', res)

      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.comService.hideLoader()
        // this.presentAlert('Success', 'You are registered!')
        this.comService.showToast("Loged in now");
        this.route.navigate(['home/calories'])
      } else {
        this.comService.hideLoader()
      }
    } catch (err) {
      console.dir('error == ', err)
      this.comService.hideLoader()
      this.comService.showToast(err.message)
    }

  } 

}
