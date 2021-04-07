import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CaloriesService } from './calories.service';
import { NewHikeSpot } from '../addnewhike/NewHikeSpot';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {

  public caloriesList: NewHikeSpot[];
  constructor(private route: Router, private caloriesService: CaloriesService) { }

  ngOnInit() {
    this.caloriesService.getHikeSpotList().subscribe(res => {
      this.caloriesList = res;
    });
  }


  async addNewHikingPlace() {
    this.route.navigate(['home/addnewhike'])

  }

  updateHikingPlace(key: string) {
    this.route.navigate(['home/addnewhike/edit', key])
  }
}
