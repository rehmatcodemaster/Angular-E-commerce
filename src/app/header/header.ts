import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import {
  CommonModule,
  isPlatformBrowser,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from '../services/products';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    FormsModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: product[] | undefined;
  cartItems: number = 0;

  mobileMenuOpen: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private product: Products
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {

        this.searchResult = undefined;
        this.mobileMenuOpen = false; // close on route change

        if (
          isPlatformBrowser(this.platformId) &&
          localStorage.getItem('seller') &&
          event.url.includes('seller')
        ) {
          this.menuType = 'seller';
          const sellerData = JSON.parse(localStorage.getItem('seller') || '{}');
          this.sellerName = sellerData?.[0]?.name || '';

        } else if (
          isPlatformBrowser(this.platformId) &&
          localStorage.getItem('user')
        ) {
          this.menuType = 'user';
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          this.userName = userData?.name || '';
          this.product.getCartList(userData?.id);
        } else {
          this.menuType = 'default';
          this.sellerName = '';
          this.userName = '';
        }

        const cartData = localStorage.getItem('localCart');
        if (cartData) {
          this.cartItems = JSON.parse(cartData).length;
        }

        this.product.cartData.subscribe(items => {
          this.cartItems = items.length;
        });
      }
    });
  }

  // ✅ Mobile menu toggle
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearchFocus(value: string) {
    if (!value) {
      this.product.searchProducts('').subscribe(result => {
        this.searchResult = result.slice(0, 5);
      });
    }
  }

  searchProduct(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    this.product.searchProducts(element.value).subscribe(result => {
      this.searchResult = result.slice(0, 5);
    });
  }

  redirectToDetails(id: number) {
    this.searchResult = undefined;
    this.router.navigate([`/product-detail-page/${id}`]);
  }

  submitSearch(val: string) {
    this.searchResult = undefined;
    this.router.navigate([`/search/${val}`]);
  }

  userlogOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
}
