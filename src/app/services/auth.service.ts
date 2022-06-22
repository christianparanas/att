import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }

  login(data: any) {
    const { username, password } = data

    if(username == "kris" && password == "kris") {
      this.setSession()

      this.router.navigate(['/']);
      alert("Logged In.")
    }
    else {
      alert("Incorrect Email or Password.")
    }
  }

  setSession() {
    const expiresAt = moment().add(7200, 'second');
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('expiresAt');

    this.router.navigate(['/auth']);
  }

  public isLoggedIn(): boolean {
    if(moment().isBefore(this.getExpiration()) == false) this.logout()
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
