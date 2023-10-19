import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn) {
      return true; // User is logged in, allow access
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the protected route
    }
  }
}