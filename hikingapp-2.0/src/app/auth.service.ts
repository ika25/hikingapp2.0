import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { UserService } from './services/user/user.service'

@Injectable()
export class AuthService implements CanActivate {

	constructor(private router: Router, private user: UserService) {

	}

	async canActivate(route) {
		if(await this.user.isAuthenticated()) {
			return true
		}

		this.router.navigate(['/login'])
		return false
	}

	getCurrentUserUid(): string {
		return this.user.getCurrentUserUid();
	}
}