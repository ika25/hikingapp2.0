import { Injectable } from '@angular/core';
import { NewHikeSpot } from './NewHikeSpot';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddNewHikeService {
  NewHikeSpotListRef: AngularFireList<any>;
  NewHikeSpotRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.NewHikeSpotListRef = db.list('NewHikeSpot');
  }

  // Create
  createNewHikeSpot(apt: NewHikeSpot) {
    return this.NewHikeSpotListRef.push({
      name: apt.name,
      level: apt.level,
      distance: apt.distance,
      starts: apt.starts,
      ends: apt.ends,
      image: apt.image,
      uid: apt.uid, // added new
      start_lat: apt.start_lat, // added new
      start_lng: apt.start_lng, // added new
      end_lat: apt.end_lat, // added new
      end_lng: apt.end_lng // added new
    })
  } 

  // Get Single
  getNewHikeSpot(id: string): Observable<any> {
    return this.db.object('NewHikeSpot/' + id).valueChanges()

  }

  // Get List
  getNewHikeSpotList() {
    this.NewHikeSpotListRef = this.db.list('/NewHikeSpot');
    return this.NewHikeSpotListRef;
  }

  // Update
  updateNewHikeSpot(id, apt: NewHikeSpot) {
    return this.db.object('NewHikeSpot/' + id).update({
      name: apt.name,
      level: apt.level,
      distance: apt.distance,
      starts: apt.starts,
      ends: apt.ends,
      image: apt.image,
      uid: apt.uid, // added new
      start_lat: apt.start_lat, // added new
      start_lng: apt.start_lng, // added new
      end_lat: apt.end_lat, // added new
      end_lng: apt.end_lng // added new
    });
    // return this.NewHikeSpotRef.update({
    //   name: apt.name,
    //   level: apt.level,
    //   distance: apt.distance,
    //   starts: apt.starts,
    //   ends: apt.ends
    // })
  }

  // Delete
  deleteNewHikeSpot(id: string) {
    this.NewHikeSpotRef = this.db.object('/NewHikeSpot/' + id);
    this.NewHikeSpotRef.remove();
  }
}