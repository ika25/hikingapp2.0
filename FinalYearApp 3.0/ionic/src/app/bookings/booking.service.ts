import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private authService: AuthService) {}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      //compare the ID of the booking I'm currently looking at in this array of bookings and if it's not equal to the booking ID I'm getting as an argument,so to this booking ID, then I will return true here,
      //If the ID of the booking I'm looking at for the items in the bookings array here,if that is equal to the booking ID I'm getting here though, then this is the booking I want to canceld therefore, this will return false
      tap(bookings => {
        this._bookings.next(bookings.filter(b => b.id !== bookingId));
      })
    );
  }
}
