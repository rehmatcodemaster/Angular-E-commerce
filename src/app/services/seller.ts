import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, signUp } from '../data-type';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Seller {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  userSignup(data: signUp) {
    this.http.post(
      'http://localhost:3000/seller',
      data,
      { observe: 'response' }
    ).subscribe((result: any) => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('seller', JSON.stringify(result.body));
      }
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    });
  }

  reloadSeller() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('seller')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['/seller-home']);
      }
    }
  }

  userLogin(data: Login) {
    this.http.get(
      `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      if (result.body && result.body.length) {

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('seller', JSON.stringify(result.body));
        }

        this.isSellerLoggedIn.next(true);
        this.router.navigate(['/seller-home']);

      } else {
        this.isLoginError.next(true); // ✅ emits error
      }
    });
  }
}
