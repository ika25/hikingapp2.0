import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from '../../user.service';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.services';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  

  async addNewHikingPlace() {
    console.log('inside addNewHikingPlace..');
  }
}
