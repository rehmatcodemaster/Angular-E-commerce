import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../services/products';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-update-product.html',
  styleUrls: ['./seller-update-product.css'],
})
export class SellerUpdateProduct implements OnInit {

  productData?: product;
  productMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private product: Products
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId);
   
    if (productId) {
      this.product.getProduct(productId).subscribe((data: product) => {
        console.log('Product Data:', data);
        this.productData = data;
      });
    }
  }

  submit(data: product): void {
    console.log('Updated Product Data:', data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product Updated Successfully';

        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
      }
    });
  }
}
