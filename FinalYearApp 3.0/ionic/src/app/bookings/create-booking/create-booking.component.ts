import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) {}
  
  // https://stackoverflow.com/questions/2627650/why-javascript-gettime-is-not-a-function
  // https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript
  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom); //first of all we find out which general date range I may use based on the place we got.
    const availableTo = new Date(this.selectedPlace.availableTo); //
    if (this.selectedMode === 'random') { //pick a random range between that starting and end date but only if this selected mode is equal to random. If it is select or anything else, then I certainly don't want to preselect dates.
     // we pass this expression into new date here and now we get a date object that actually will be a valid timestamp.
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();
      
      // 
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // we extract the data here and pass it back to the component that actually opened this model in on book place.
  onBookPlace() {
    if (!this.form.valid || !this.datesValid) {
      return;
    }
    //We pass booking data here, we have key values containing the values entered by user.
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: this.form.value['guest-number'],
          startDate: this.form.value['date-from'],
          endDate: this.form.value['date-to']
        }
      },
      'confirm'
    );
  }

  //
  datesValid() {
    const startDate = new Date(this.form.value['date-from']);//start date that was selected by using this forum value a date - from
    const endDate = new Date(this.form.value['date-to']);//then I want to get my end date in the same way.
    return endDate > startDate;//compare if end date is greater than start date and only if that is the case. This is valid.
  }
}
