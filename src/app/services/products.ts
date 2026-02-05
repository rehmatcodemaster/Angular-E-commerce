import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, MyOrder, product } from '../data-type';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Products {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
  addProducts(data: product) {
    console.log('service called');
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(data: product) {
    console.log(Products);
    return this.http.put(`http://localhost:3000/products/${data.id}`, data);
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=15');
  }
  TrendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=15');
  }
  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
  LocalAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(data: Cart) {
    return this.http.post('http://localhost:3000/cart', data);
  }
  getCartList(userId: number) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' }).subscribe((res) => {
      console.log(res);
      if (res && res.body) {
        this.cartData.emit(res.body);
      }
    });
  }
  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userData.id}`);
  }
  orderNow(data: MyOrder) {
    return this.http.post('http://localhost:3000/MyOrder', data)
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
       return this.http.get<MyOrder[]>(
      `http://localhost:3000/MyOrder?userId=${userData.id}`
    );
  }
 deleteCartItems(cartId: number) {
  return this.http.delete(`http://localhost:3000/cart/${cartId}`)
    .subscribe((result) => {
      if (result) {
        this.cartData.emit([]); // update cart data
      }
    }, (error) => {
      console.error('Error deleting cart item ❌', error);
    });
}    
  // ✅ Get Orders List
 

  // ✅ Delete Order by ID
   deleteOrder(orderId: any) {
  return this.http.delete(`http://localhost:3000/MyOrder/${orderId}`);
}


}