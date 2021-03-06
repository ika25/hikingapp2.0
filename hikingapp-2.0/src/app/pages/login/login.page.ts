import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
	password: string = ""

  constructor(private route: Router,public afAuth: AngularFireAuth) { }

  ngOnInit() {

    //this.route.navigate(['/home']);
  }

  async validateLogin() {
    const { username, password } = this

    try{
      const res = await this.afAuth.signInWithEmailAndPassword(username , password)

    } catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
		}
    
	}

  

}
