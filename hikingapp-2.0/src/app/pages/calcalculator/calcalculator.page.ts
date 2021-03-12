import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';

@Component({
  selector: 'app-calcalculator',
  templateUrl: 'calcalculator.page.html',
  styleUrls: ['calcalculator.page.scss']
})
export class CalcalculatorPage implements OnInit {

  info: any = null;

  constructor() { 

    
  }  
  ngOnInit(): void {
     
  }
}