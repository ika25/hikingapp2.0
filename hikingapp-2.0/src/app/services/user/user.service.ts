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
		console.log('user service setUser='+user);
		this.user = user
		this.storage.set('u_data', user);
	}

	getUsername(): string {
		console.log('user service getUsername=');
		return this.user.username
	}

	getCurrentUserUid(): string {
		console.log('user service getCurrentUserUid='+this.user.uid);
		return this.user.uid;
	}
 
	async isAuthenticated() {
		console.log('user service isAuthenticated user='+this.user);
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

		console.log('user service getUID user.uid='+this.user.uid);
		return this.user.uid
	}

	
    getAllUsers(): AngularFireList<User> {
		console.log('user service getAllUsers');
		return this.db.list(`/users`);
	  }

	  createUser(user : User) : void {     
        // console.log('create user in db uid: ', uid);
		// get the ref of the users with uid and save it in the db
		
		console.log('user service createUser');
        let userRef = this.db.object(`users/${this.getUID()}`);
        userRef.set({email: user.email, name: user.name});

    }
  
}