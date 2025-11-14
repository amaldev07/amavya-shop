import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dataUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.dataUrl).pipe(
      map(products => products.find(p => p.id === id))
    );
  }

}
