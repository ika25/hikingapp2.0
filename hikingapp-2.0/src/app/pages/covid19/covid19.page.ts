import { Component } from '@angular/core';
import { CovidService } from '../../services/covid19.service';

@Component({
  selector: 'app-covid19',
  templateUrl: 'covid19.page.html',
  styleUrls: ['covid19.page.scss']
})
export class Covid19Page {

  info: any = null;

  constructor(private covidService: CovidService) { 

    this.covidService.getAll().subscribe((data)=>{
      this.info = data;
    });

  }  
}