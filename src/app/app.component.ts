import { Component } from '@angular/core';
import { AuthService } from '../app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'test';
  currentUser: any;

  constructor(private authService: AuthService) {}

  logout(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    } else {
      this.authService.login();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


}




