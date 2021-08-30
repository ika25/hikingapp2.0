import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database'
import { UserService } from "../user/user.service"

@Injectable()
export class CaloriesService {
    constructor(
        private db: AngularFireDatabase,
        private firestore: AngularFirestore,
        private user: UserService
    ) {

    }

    setData(addData) {
        let userRef = this.db.object(`caloriesInfo/${this.user.getUID()}`);
        userRef.set(addData);
    }

    compareId(loginId): Promise<any> {    //read data in firebase database and compare userId.
        return new Promise((resolve, reject) => {
            let userRef = this.db.database.ref(`caloriesInfo/${loginId}`);
            userRef.once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val()); // returns snap data
                } else {
                    reject(""); //if didn't stored, return error
                }
            })
        })
    }
}