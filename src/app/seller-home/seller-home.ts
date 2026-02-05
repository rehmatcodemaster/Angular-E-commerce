import { Component } from '@angular/core';
import { Products } from '../services/products';
import { product } from '../data-type';
import { FormsModule } from "@angular/forms";
import { NgFor } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-seller-home',
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css',
})
export class SellerHome {
  productList:undefined | product[];
  productMessage:undefined|string;
  constructor(private product: Products) { }


  ngOnInit(): void {
      this.List();
  }
  deleteProduct(id:number){
    console.log('Test id',id);
    this.product.deleteProduct(id).subscribe((result)=>{
       if(result){
          this.productMessage='Product is delete';
          this.List()
       }
    })
    setTimeout(() => {
       this.productMessage=undefined
    },3000);
  }
  List(){
     this.product.productList().subscribe((result) => {
      console.log(result);
      if(result){
        this.productList = result
      }
    }
  )
  }
}
