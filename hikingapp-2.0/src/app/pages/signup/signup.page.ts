import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

//Signup page to dispaly the details for the user to register with the applicaiton
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;

  constructor(private storage: Storage, private auth: AuthService, private userService: UserService, private util: UtilService, private fb: FormBuilder
    , private router: Router
  ) { }


  //function to create form with the components required
  createFrom(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  // create the account of the user
  createAccount(): void {
    console.log('form', this.registerForm.value);
    let email: string = this.registerForm.value['email'];
    let msg: string = `Created account for: <b>${email}</b>`;
    console.log(msg);
    this.auth.createAccount(this.registerForm.value).then(data => {
      console.log('uid account: ', data.user.uid);
      this.userService.setUser({
        username: this.registerForm.value.name,
        uid: data.user.uid
      })
      this.storage.set('uid', data.user.uid);
      this.userService.createUser(this.registerForm.value);

      this.util.doAlert("Success", msg, "Ok");
      // this.router.navigateByUrl('/login');
      this.router.navigateByUrl('/home/calories');
    }, (reason) => {
      this.util.doAlert("Error", reason, "Ok")
    });
  }

  ngOnInit() {
    this.createFrom();
  }

}
