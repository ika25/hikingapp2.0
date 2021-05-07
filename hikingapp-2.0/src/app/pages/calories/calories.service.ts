import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewHikeSpot } from '../addnewhike/NewHikeSpot';

@Injectable({
    providedIn: 'root'
})

export class CaloriesService {
    NewHikeSpotListRef: Observable<any[]>;

    NewHikeSpotList: NewHikeSpot[];
    NewHikeSpotRef: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) {
        // this.NewHikeSpotListRef = db.list('NewHikeSpot');
    }
    // Get List
    getHikeSpotList(): Observable<any> {
        this.NewHikeSpotListRef = this.db.list('/NewHikeSpot').snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, data: c.payload.val() }))
            )
        );
        return this.NewHikeSpotListRef;
        // this.NewHikeSpotListRef.subscribe(res => {
        //     console.log(res)
        //     console.log('resp,....')
        // })
        // console.log(NewHikeSpotListRef)
        // let data = NewHikeSpotListRef.snapshotChanges().pipe(map(changes => {
        //     console.log('ddddd')
        //     console.log(changes)
        //     // return changes.map(c => ({ key: c.payload.key }));
        // }));
        console.log(":data...................")
        // let data = NewHikeSpotListRef.snapshotChanges().pipe(
        //     map(actions =>
        //         actions.map(a => {
        //             const data = a.payload.doc.data();
        //             const id = a.payload.doc.id;
        //             return { id, ...data };
        //         })
        //     )
        // );
        // console.log(data)
    }


    // This is the function used to add the hiking place as favorites
    public addToFavorite(userId, hikeId) {
        let object = {};
        object[hikeId] = true;
        return this.db.object('/favorite/' + userId).update(object);
    }

    //This is used when user unchecks the favorite
    public markUnFavorite(userId, hikeId) {
        console.log("delet")
        return this.db.object('/favorite/' + userId + '/' + hikeId).remove();
    }

    // This function is used to get list of favorites from firebase
    public getMyFavorites(userId) {
        return this.db.list('/favorite/' + `${userId}`).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key }))
            )
        );
    }

    public delete_hike(userId,hikeId) {
        this.db.object('/favorite/' + userId + '/' + hikeId).remove();

        return this.db.object('/NewHikeSpot/' + hikeId).remove();
    }

}