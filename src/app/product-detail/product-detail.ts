import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../services/products';
import { product, Cart } from '../data-type';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [NgIf, NgStyle],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {

  productData: product | undefined;
  productQuantity: number = 1;
  removeCart: boolean = false;

  // ✅ FIX: relaxed typing
  CartData: any;

  zoomStyle: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: Products
  ) {}

  // ===== IMAGE ZOOM =====
  onMouseMove(event: MouseEvent) {
    const element = (event.target as HTMLElement).closest('.product-image') as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    this.zoomStyle = {
      transform: 'scale(2)',
      transformOrigin: `${x}% ${y}%`
    };
  }

  onMouseLeave() {
    this.zoomStyle = {
      transform: 'scale(1)',
      transformOrigin: 'center'
    };
  }

  // ===== INIT =====
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (!productId) return;

    // product detail
    this.productService.getProduct(productId).subscribe((data) => {
      this.productData = data;
    });

    // local cart check
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      const items = JSON.parse(localCart);
      const exist = items.find(
        (item: product) => item.id.toString() === productId
      );
      this.removeCart = !!exist;
    }

    // logged-in user cart check
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user).id;

      this.productService.getCartList(userId);
      this.productService.cartData.subscribe((items) => {

        // ✅ FIX: use find instead of filter & proper CartData
        const item = items.find(
          (item: any) => item.productId?.toString() === productId
        );

        if (item) {
          this.CartData = item;   // now CartData.id exists
          this.removeCart = true;
          console.log("CartData ready for remove:", this.CartData);
        }
      });
    }
  }

  // ===== QUANTITY =====
  handleQuantity(value: string) {
    if (value === 'max') {
      this.productQuantity += 1;
    } else if (value === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  // ===== ADD TO CART =====
  addToCart() {
    if (!this.productData) return;

    this.productData.quantity = this.productQuantity;

    // local user
    if (!localStorage.getItem('user')) {
      this.productService.LocalAddToCart(this.productData);
      this.removeCart = true;
    }
    // logged-in user
    else {
      const user = localStorage.getItem('user');
      const userId = user && JSON.parse(user).id;

      const cartData: Cart = {
        ...this.productData,
        userId,
        productId: this.productData.id,
        quantity: this.productData.quantity ?? 1
      };

      delete cartData.id;

      this.productService.addToCart(cartData).subscribe((res) => {
        if (res) {
          this.productService.getCartList(userId);
          this.removeCart = true;
        }
      });
    }
  }

  // ===== REMOVE FROM CART =====
  removeFromCart() {
    // local user
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(this.productData?.id!);
      this.removeCart = false;
    }
    // logged-in user
    else if (this.CartData?.id) {
      this.productService.removeToCart(this.CartData.id).subscribe((res) => {
        if (res) {
          const user = localStorage.getItem('user');
          const userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.removeCart = false;
        }
      });
    }
  }
}
