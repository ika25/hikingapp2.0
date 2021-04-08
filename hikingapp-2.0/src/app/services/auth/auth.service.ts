import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router, CanActivate } from '@angular/router'
import { User } from 'src/app/models/User'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService implements CanActivate {

	constructor(private router: Router, private user: UserService,private afAuth: AngularFireAuth) {

	}

	async canActivate(route) {
		if(await this.user.isAuthenticated()) {
			return true
		}

		this.router.navigate(['/login'])
		return false
	}

	getCurrentUserUid(): string {
		return this.user.getCurrentUserUid();
	}

	  // register
	  public createAccount(user: User)  {
		return this.afAuth.createUserWithEmailAndPassword(user.email, user.password); 
	   }

	
  // log in 
  public sigin(user: User)    {
	return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }
}