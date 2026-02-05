import { Component } from '@angular/core';
import { Products } from '../services/products';
import { Cart, priceSummary } from '../data-type';
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart-page',
  imports: [NgFor],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cartData: Cart[] | undefined;

  priceSummary: priceSummary = {
    price: 0,
    Discount: 0,
    tax: 0,
    DeliveryFee: 0,
    total: 0,
  };

  constructor(private productsService: Products, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  checkOut() {
    this.router.navigate(['/Checkout']);
  }

  loadDetails() {
    this.productsService.currentCart().subscribe((result) => {
      this.cartData = result;

      let price = 0;

      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.Discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.DeliveryFee = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      if(this.cartData.length===0){
        this.router.navigate(['/'])
      }
    });
  }

  removeTocart(cartId: number | undefined) {
    if (!cartId) return;

    this.productsService.removeToCart(cartId).subscribe(() => {
      const user = localStorage.getItem('user');
      const userId = user ? JSON.parse(user).id : null;

      this.loadDetails();

      if (userId) {
        this.productsService.getCartList(userId);
      }
    });
  }
}
 