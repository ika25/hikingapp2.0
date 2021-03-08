import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  loader: any;  

  constructor(private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  showToast(message) {
    this.toastCtrl.create({ message: message, duration: 3000 }).then(res => res.present());
  }

  showAlert(message) {
    this.alertCtrl.create({
      message: message,
      buttons: ['ok']
    }).then(res => res.present());
  }

  async showLoader(message) {
    const check = await this.loadCtrl.getTop();
    if (check) {
      this.loadCtrl.dismiss();
    }
    this.loadCtrl.create({ message: message, duration: 10000 }).then(res => {
      this.loader = res.present();      
    });
  }

  async hideLoader() {
    const check = await this.loadCtrl.getTop();
    if (check) {
      this.loadCtrl.dismiss();
    } else {
      this.loadCtrl.dismiss();
    }
  }  
}