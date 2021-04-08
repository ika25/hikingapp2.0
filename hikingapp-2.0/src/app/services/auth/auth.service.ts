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
		console.log('AuthService service canActivate');
		if(await this.user.isAuthenticated()) {
			return true
		}

		this.router.navigate(['/login'])
		return false
	}

	getCurrentUserUid(): string {
		console.log('AuthService service getCurrentUserUid'+this.user.getCurrentUserUid());
		return this.user.getCurrentUserUid();
	}

	  // register
	  public createAccount(user: User)  {
		console.log('AuthService service createAccount'+user);
		return this.afAuth.createUserWithEmailAndPassword(user.email, user.password); 
	   }

	
  // log in 
  public sigin(user: User)    {
	console.log('AuthService service sigin'+user);
	return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }
}