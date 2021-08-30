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

	user: user;
	lat: any = 0;
	lng: any = 0;

	constructor(
		private db: AngularFireDatabase,
		private afAuth: AngularFireAuth,
		private storage: Storage
	) {

	}

	/**
	 * calculate distance between 2 points
	 * @param lat1 
	 * @param lon1 
	 * @param lat2 
	 * @param lon2 
	 * @returns 
	 */
	 calcCrow(lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0) {
		if (!lat1 || !lon1 || !lat2 || !lon2 || lat1 == 0 || lon1 == 0 || lat2 == 0 || lon2 == 0) return 0;

    let R = 6371; // km
    let dLat = this.toRad(lat2 - lat1);
    let dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;// * 0.621371;

    return Number(d.toFixed(1));
  }
	toRad(value) {
    return value * Math.PI / 180;
  }

	// set the user 
	setUser(user: user) {
		console.log('user service setUser=' + user);
		this.user = user
		console.log(user);
		console.log("123" + user.username);
		this.storage.set('u_data', user);
	}

	removeUser() {
		this.user = null;
		this.storage.remove('u_data');
		this.storage.remove('uid');
	}

	// get the user name of the current user
	getUsername() {
		console.log('user service getUsername=');
		return this.storage.get('u_data');
	}

	// fetch the current user id
	getCurrentUserUid(): string {
		console.log('user service getCurrentUserUid=' + this.user.uid);
		return this.user.uid;
	}


	// checks if the user is authenticated
	async isAuthenticated() {
		console.log('user service isAuthenticated user=' + this.user);
		if (this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if (user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}

	getUID(): string {

		console.log('user service getUID user.uid=' + this.user.uid);
		return this.user.uid
	}

	// fetch all the users from te fireabase
	getAllUsers(): AngularFireList<User> {
		console.log('user service getAllUsers');
		return this.db.list(`/users`);
	}

	// create the user by integrated with firestore
	createUser(user: User): void {
		// console.log('create user in db uid: ', uid);
		// get the ref of the users with uid and save it in the db

		console.log('user service createUser');
		let userRef = this.db.object(`users/${this.getUID()}`);
		userRef.set({ email: user.email, name: user.name });

	}

	/**
 * get user data by uid from firebase database
 * @param uid 
 * @returns 
 */
	getUserById(uid) {
		return this.db.database.ref(`users/${uid}`).get();
	}

	saveCalorie(data) {
		const ref = this.db.database.ref('Calories').push();
		ref.set(data);
	}

	updateCalorie(key, data) {
		this.db.object(`Calories/${key}`).update(data);
	}

}