import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../user.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

	email: string = ""
	password: string = ""
	username: string = ""

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router) { }

  ngOnInit() {
  }

 
  async register() {
		const { email, password,username } = this 
		try {
			console.log('usernmae='+email);
			const res = await this.afAuth.createUserWithEmailAndPassword(email , password)
			console.log(res)	 
			this.afstore.doc(`users/${res.user.uid}`).set({
				email
			})

			this.user.setUser({
				username,
				uid: res.user.uid
			})

			this.presentAlert('Success', 'You are registered!')
			this.router.navigate(['/login']) 
		} catch(error) {
			console.dir(error)
		}
  } 

  
	async presentAlert(title: string, content: string) { 
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})
		await alert.present()
	 
	}

}
