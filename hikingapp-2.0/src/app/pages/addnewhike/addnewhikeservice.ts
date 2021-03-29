import { Injectable } from '@angular/core';
import { NewHikeSpot } from './NewHikeSpot';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AddNewHikeService {
  NewHikeSpotListRef: AngularFireList<any>;
  NewHikeSpotRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createNewHikeSpot(apt: NewHikeSpot) {
    console.log(NewHikeSpot);
    return this.NewHikeSpotListRef.push({
      name: apt.name,
      level: apt.level,
      distance: apt.distance,
      starts: apt.starts,
      ends: apt.ends
    })
  }

  // Get Single
  getNewHikeSpot(id: string) {
    this.NewHikeSpotRef = this.db.object('/NewHikeSpot/' + id);
    return this.NewHikeSpotRef;
  }

  // Get List
  getNewHikeSpotList() {
    this.NewHikeSpotListRef = this.db.list('/NewHikeSpot');
    return this.NewHikeSpotListRef;
  }

  // Update
  updateNewHikeSpot(id, apt: NewHikeSpot) {
    return this.NewHikeSpotRef.update({
      name: apt.name,
      level: apt.level,
      distance: apt.distance,
      starts: apt.starts,
      ends: apt.ends
    })
  }

  // Delete
  deleteNewHikeSpot(id: string) {
    this.NewHikeSpotRef = this.db.object('/NewHikeSpot/' + id);
    this.NewHikeSpotRef.remove();
  }
}