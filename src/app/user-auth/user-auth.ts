import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, product, signUp } from '../data-type';
import { User } from '../services/user';
import { Products } from '../services/products';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.html',
  styleUrls: ['./user-auth.css'],
})
export class UserAuth {
  showLogin: boolean = false;
  autherror: string = '';

  constructor(private user: User, private productService: Products) {} // renamed for clarity

  ngOnInit(): void {
    this.user.userAuthLoaded();
  }

  // Signup function
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  // Login function
  login(data: Login) {
    this.user.userLogin(data);
    console.log('Login Data:', data);

    this.user.invaliduserAuth.subscribe((result) => {
      console.log('Auth Result:', result);
      if (result) {
        this.autherror = 'Please enter valid credentials';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  // Toggle Login form
  openLogin() {
    this.showLogin = true;
  }

  // Toggle Signup form
  openSignup() {
    this.showLogin = false;
  }

  // Move local cart to remote DB after login
  localCartToRemoteCart() {
    const data = localStorage.getItem('localCart');
     const user = localStorage.getItem('User');
    const userId: number = user ? JSON.parse(user).id : 0; // default 0 if not found
    if (!data) return;

    const cartDataList: product[] = JSON.parse(data);
   

    cartDataList.forEach((product: product, index: number) => {
      const cartData: Cart = {
        ...product,
        productId: product.id,
        userId: userId,
        quantity: product.quantity ?? 1, // ensure number
      };

      delete cartData.id; // remove id before sending to backend

      // Add item to DB
      setTimeout(() => {
        this.productService.addToCart(cartData).subscribe((result) => {
          console.log('Item stored in DB:', cartData.name);

          // remove localCart after last item
          if (index === cartDataList.length - 1) {
            localStorage.removeItem('localCart');
          }
        });
      }, 3000);
    });
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
 
}
