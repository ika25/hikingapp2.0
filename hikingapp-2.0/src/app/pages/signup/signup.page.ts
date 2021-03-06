import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

	email: string = ""
	password: string = ""

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
		//public afstore: AngularFirestore,
		//public user: UserService,
		//public alertController: AlertController,
		public router: Router) { }

  ngOnInit() {
  }

 
  async register() {
		const { email, password } = this 
		try {
			console.log('usernmae='+email);
			const res = await this.afAuth.createUserWithEmailAndPassword(email , password)
			console.log(res)	 
			//this.presentAlert('Success', 'You are registered!')
			//this.router.navigate(['/tabs']) 
		} catch(error) {
			console.dir(error)
		}
  } 
	async presentAlert(title: string, content: string) { 
	 
	}

}
