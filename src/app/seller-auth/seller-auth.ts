import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { signUp } from '../data-type';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit, OnDestroy {

  showLogin = false;
  authError = '';
  private errorSub!: Subscription;

  constructor(private seller: Seller) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: signUp) {
    this.seller.userSignup(data);
  }

  Login(data: signUp) {
    this.authError = '';

    this.seller.userLogin(data);

    this.errorSub = this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is incorrect';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
