import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from '../services/products';
import { Cart, MyOrder, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
orderMsg:string|undefined;
  priceSummary: priceSummary = {
    price: 0,
    Discount: 0,
    tax: 0,
    DeliveryFee: 0,
    total: 0,
  };

  constructor(private productsService: Products,private router:Router) {}
    totalPrice:number|undefined;
    cartData:Cart[]|undefined;


  ngOnInit(): void {
    this.productsService.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData=result;

      result.forEach((item: any) => {
        if (item.quantity) {
          price += item.price * item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.tax = Math.round(price * 0.1);
      this.priceSummary.Discount = Math.round(price * 0.1);
      this.priceSummary.DeliveryFee = 100;

      this.priceSummary.total =
        price + this.priceSummary.tax + this.priceSummary.DeliveryFee - this.priceSummary.Discount;

      console.log('Price Summary:', this.priceSummary);
    });
  }

  orderNow(data:MyOrder) {
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.priceSummary){
      let orderData:MyOrder={ 
        ...data,
        priceSummary:this.priceSummary,
        userId
      }
     this.cartData?.forEach((item) => {
  // Your code here
    setTimeout(() => {
        item.userId &&  this.productsService.deleteCartItems(item.userId)
    }, 3000);
});

         this.productsService.orderNow(orderData).subscribe((result)=>{
          if(result){
            this.orderMsg='Your order has been placed'
            setTimeout(() => {
              this.router.navigate(['/Your-orders']);
              this.orderMsg=undefined;
            },3000);
          }
         })
    }
    // console.log('Order Data:', data);
    // console.log('Final Bill:', this.priceSummary);
  }
  myorder(){
  
}


  
}
