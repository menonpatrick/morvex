import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  // Make sure that you unsubscribe when you have subscribed to an observable in Firebase
  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
