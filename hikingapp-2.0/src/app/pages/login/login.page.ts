import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


// This page is to display the Login page  for the user
// to enter the login details that are need to login to the application
export class LoginPage implements OnInit {

  loginForm : FormGroup; 

  constructor(
    private auth : AuthService,
    private uitil : UtilService,
    private fb : FormBuilder,
    private storage: Storage,
    private userService: UserService,
    private router: Router) { 


     }

  createFrom() : void {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
    });  
  }    

  sigin() : void {
    console.log('form', this.loginForm.value);
    this.auth.sigin(this.loginForm.value).then(data => {
      console.log('uid sigin: ', JSON.stringify(data.user.uid));
      this.storage.set('uid', data.user.uid); // no need JSON.stringify

      this.userService.getUserById(data.user.uid).then(snap => {
        var userData = snap.val();
        userData.uid = snap.key;
        this.userService.setUser(userData);
        this.router.navigateByUrl('/home/calories');
      });
    },(reason) => {
      this.uitil.doAlert("Error", reason, "Ok");
      this.router.navigateByUrl('/login');
    });
  }
 
  ngOnInit() {
    this.createFrom();
  }

}