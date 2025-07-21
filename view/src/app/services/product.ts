import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  image_url: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface OrderResponse {
  order_id: string;
  status: string;
  message: string;
  estimated_delivery?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError));
  }

  createOrder(items: OrderItem[]): Observable<OrderResponse> {
    return this.http
      .post<OrderResponse>(`${this.apiUrl}/orders`, { items })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error('Falha ao conectar ao servidor, tente novamente.'));
  }
}