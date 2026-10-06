import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  public cart$: Observable<MenuItem[]> = this.cartItemsSubject.asObservable();

  get currentCart(): MenuItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(dish: MenuItem, quantity: number = 1): void {
    const current = [...this.currentCart];
    const existingIndex = current.findIndex(item => item.id === dish.id);

    if (existingIndex > -1) {
      const existing = current[existingIndex];
      const newQty = (existing.quantity || 1) + quantity;
      current[existingIndex] = { ...existing, quantity: newQty };
    } else {
      current.push({ ...dish, quantity });
    }

    this.cartItemsSubject.next(current);
  }

  updateQuantity(id: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    const current = this.currentCart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    this.cartItemsSubject.next(current);
  }

  removeFromCart(id: string): void {
    const current = this.currentCart.filter(item => item.id !== id);
    this.cartItemsSubject.next(current);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getSubtotal(): number {
    return this.currentCart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  getTax(): number {
    return Math.round(this.getSubtotal() * 0.05);
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  getTotalCount(): number {
    return this.currentCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }
}
