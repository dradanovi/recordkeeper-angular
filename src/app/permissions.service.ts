import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    if (state.url == '/admin') {
      return this.authService.checkAuthorities('ROLE_ADMIN');
    } else if(state.url == '/work' || state.url == '/user' || state.url == '/review' || state.url == '/user') {
      return this.authService.checkAuthorities('ROLE_EMPLOYEE');
    } else {
      return true;
    }

  }
}
