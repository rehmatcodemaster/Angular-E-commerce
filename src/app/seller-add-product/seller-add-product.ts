import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Products } from '../services/products';
import { product } from '../data-type';
@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css',
})
export class SellerAddProduct {
  addProductMessage:string | undefined;

  constructor(private product: Products) { }
  submit(data: product,form:any) {
    this.product.addProducts(data).subscribe((result)=>{
        console.log(result);
         if(result){
          this.addProductMessage='Product is added successfully';
          form.reset();
         }
         setTimeout(()=>this.addProductMessage=undefined,3000);
    })
  }
}
