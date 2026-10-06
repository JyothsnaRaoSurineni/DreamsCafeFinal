import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, LocationItem, Review, Reservation, Order, Subscriber, Analytics } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<LocationItem[]> {
    return this.http.get<LocationItem[]>(`${this.baseUrl}/locations`);
  }

  getMenu(category?: string, diet?: string, search?: string): Observable<MenuItem[]> {
    let params = new HttpParams();
    if (category && category !== 'All') params = params.set('category', category);
    if (diet && diet !== 'All') params = params.set('diet', diet);
    if (search) params = params.set('search', search);

    return this.http.get<MenuItem[]>(`${this.baseUrl}/menu`, { params });
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`);
  }

  getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>(`${this.baseUrl}/analytics`);
  }

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.baseUrl}/subscribers`);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  createReservation(data: any): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, data);
  }

  createOrder(data: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, data);
  }

  createReview(data: any): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews`, data);
  }

  addSubscriber(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/subscribers`, { email });
  }

  updateReservationStatus(id: string, status: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.baseUrl}/reservations/${id}/status`, { status });
  }

  updateOrderStatus(id: string, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/orders/${id}/status`, { status });
  }

  addMenuItem(dish: any): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.baseUrl}/menu`, dish);
  }

  deleteMenuItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/menu/${id}`);
  }
}
