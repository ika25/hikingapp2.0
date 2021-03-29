import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AddNewHikeService } from './addnewhikeservice';

@Component({ 
  selector: 'app-addnewhike',
  templateUrl: './addnewhike.page.html',
  styleUrls: ['./addnewhike.page.scss'],
})
export class AddnewhikePage implements OnInit {
 
  AddNewForm: FormGroup;

  constructor(
    private addnewService: AddNewHikeService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.AddNewForm = this.fb.group({
      name: [''],
      level: [''],
      distance: [''],
      starts: [''],
      ends: ['']
    })
  }

  formSubmit() {
    if (!this.AddNewForm.valid) {
      console.log('form not valid');
      return false;
    } else {
      this.addnewService.createNewHikeSpot(this.AddNewForm.value).then(res => {
        console.log(res)
        this.AddNewForm.reset();
        this.router.navigate(['/calories']);
      })
        .catch(error => console.log(error));
    }
  }
}