import { Component, OnInit } from '@angular/core';
import { Products } from '../services/products';
import { MyOrder } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-orders.html',
  styleUrls: ['./your-orders.css'],
})
export class YourOrders implements OnInit {
  orderData: MyOrder[] = [];

  constructor(private productsService: Products) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  // ✅ Load Orders
  getOrderList() {
    this.productsService.orderList().subscribe({
      next: (orders) => {
        console.log('ORDERS DATA 👉', orders);
        this.orderData = orders;
      },
      error: (err) => console.error('Error fetching orders', err),
    });
  }

  // ✅ Cancel Order (Delete)
  cancelOrder(orderId: any) {
    if (orderId) {
      this.productsService.deleteOrder(orderId).subscribe({
        next: () => {
          alert("Order Cancelled Successfully!");
          this.getOrderList();
        },
        error: (err) => {
          console.log("Delete Error:", err);
        }
      });
    }
  }
}
