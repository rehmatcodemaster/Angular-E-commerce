import { Injectable, EventEmitter } from '@angular/core';
import { Login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class User {

  invaliduserAuth = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  userSignUp(user: signUp) {
    this.http
      .post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else {
          alert('Something went wrong');
        }
      });
  }

  userLogin(data: Login) {
    this.http
      .get<Login[]>(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result && result.body && result.body.length > 0) {
          this.invaliduserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        } else {
          this.invaliduserAuth.emit(true);
        }
      });
  }

  userAuthLoaded() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
