import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';
import { AlertController } from '@ionic/angular';


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
     public afAuth: AngularFireAuth) { }

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

    try{
      const res = await this.afAuth.signInWithEmailAndPassword(username , password)
      console.log(res)

      if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
        })
        
        this.presentAlert('Success', 'You are registered!')		 
				this.route.navigate(['home'])
      }
      
    } catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
        console.log("User not found")
        
			}
		}
    
	}

  

}
