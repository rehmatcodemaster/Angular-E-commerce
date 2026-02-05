import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../services/products';
import { product } from '../data-type';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   popularProducts: undefined | product[];
   TrendyProducts: undefined | product[];
  constructor(private product: Products) { }


  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      console.log(data);
      this.popularProducts = data;
    });
    this.product.TrendyProducts().subscribe((data) => {
      console.log(data);
      this.TrendyProducts = data;
    });
  }
}

