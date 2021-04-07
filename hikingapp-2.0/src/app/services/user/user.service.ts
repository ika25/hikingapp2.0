import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Storage } from '@ionic/storage'
import { first } from 'rxjs/operators' 
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../../models/User';

interface user {
	username: string,
	uid: string
}

@Injectable()
export class UserService {

	user: user

	constructor(
		private db : AngularFireDatabase, 
		private afAuth: AngularFireAuth,
		private storage: Storage
		) {

	}

	setUser(user: user) {
		this.user = user
		this.storage.set('u_data', user);
	}

	getUsername(): string {
		return this.user.username
	}

	getCurrentUserUid(): string {
		return this.user.uid;
	}
 
	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}

	
    getAllUsers(): AngularFireList<User> {
		return this.db.list(`/users`);
	  }
  
}