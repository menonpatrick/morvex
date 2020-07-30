import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$
    .pipe(
      switchMap(user => {
        return this.userService.get(user.uid).valueChanges();
      }),
      map(appUser => appUser.isAdmin)
    );
  }
}
