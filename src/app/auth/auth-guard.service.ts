import {CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlSegment } from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(state.url === '/' && this.authService.isAuthenticated()) {
			this.router.navigate(['/recipes']);
			return false;
		} else if(state.url === '/' && !this.authService.isAuthenticated()) {
			return true;
		}
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(['/']);
		}
		return this.authService.isAuthenticated();
	}

	canLoad(route: Route, segments: UrlSegment[]) {
		return this.authService.isAuthenticated();
	}
}