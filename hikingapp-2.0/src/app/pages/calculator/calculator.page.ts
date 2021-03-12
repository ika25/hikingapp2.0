import { Component, OnInit } from '@angular/core';
import { AlertController } from 'node_modules_del/@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  constructor(public alertController: AlertController) {}
  ngOnInit(): void {
    
  } 
  
  async calculate() {
    console.log('(((((( in claculate))))))))');
    const alert = await this.alertController.create({ 
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

  }

}
