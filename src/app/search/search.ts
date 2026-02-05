import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '../services/products';
import { product } from '../data-type';
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-search',
  imports: [NgForOf, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchResult: undefined | product[];

  constructor(private route: ActivatedRoute, private product: Products) {

  }

  ngOnInit(): void { 
    let query = this.route.snapshot.paramMap.get('query');  
    console.log(query);
      query && this.product.searchProducts(query).subscribe((result) => {
        console.log(result);
        this.searchResult = result;
        
    });
  }

}
