import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
	password: string = ""

  constructor(private route: Router,public afAuth: AngularFireAuth, public user: UserService) { }

  ngOnInit() {

    //this.route.navigate(['/home']);
  }

  async login() {
		const { username, password } = this
		try {
			// kind of a hack. 
      const res = await this.afAuth.signInWithEmailAndPassword (username , password)
      console.log('username='+username+' password='+password);
      if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.route.navigate(['/calories'])
			}
	  		
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
		}
	}

  validateLogin(){ 
    this.route.navigate(['/home']);
  }

}
