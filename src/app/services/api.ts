import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  // for api fetching products
  // private apiUrl = 'https://dummyjson.com/products';
  // constructor(private http: HttpClient) {}
  // getProducts() {
  //   return this.http.get<any>(this.apiUrl);
  // }

  private products: string[] = ['pizza', 'burger', 'pasta'];
  // mathod to get products
  getProducts(): string[] {
    return this.products;
  }

  // method to add product
  addProduct(product: string) {
    this.products.push(product);
  }
}
