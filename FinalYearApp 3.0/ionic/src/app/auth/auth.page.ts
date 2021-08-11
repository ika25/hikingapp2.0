import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}//We navigate here so we inject router here.1

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/places/tabs/discover');//Here we call router and navigate to URL we want to go.2
  }
}
