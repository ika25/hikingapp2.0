import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './appointment1';

@Component({
  selector: 'app-addnewhike',
  templateUrl: './addnewhike.page.html',
  styleUrls: ['./addnewhike.page.scss'],
})
export class AddnewhikePage implements OnInit {
 
  bookingForm: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      level: [''],
      distance: [''],
      starts: [''],
      ends: ['']
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }
}