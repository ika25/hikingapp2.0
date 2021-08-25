import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.userIsAuthenticated) { // We check if user is authenticated, 
      this.router.navigateByUrl('/auth');//if not true we navigate to auth page where the user can login.
    }
    return this.authService.userIsAuthenticated;// This code will still execute and will retunr false if user isnt auth. but user is this will return true and continue.
  }
}
