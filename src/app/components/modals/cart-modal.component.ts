import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem, Order } from '../../models/models';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()" style="max-width: 650px;">
        
        <!-- MODAL HEADER -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: var(--primary); font-size: 20px;">🛍️</span>
            <h2 style="font-family: var(--font-display); font-size: 22px; color: var(--white);">
              Your Gourmet Order
            </h2>
          </div>
          <button (click)="close.emit()" style="color: rgba(255,255,255,0.5); cursor: pointer; font-size: 22px;">
            ✕
          </button>
        </div>

        <!-- MODAL BODY -->
        <div style="padding: 32px;">
          
          <div *ngIf="orderConfirmed" style="text-align: center; padding: 20px 0;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(74,222,128,0.15); border: 1px solid #4ade80; display: flex; align-items: center; justify-content: center; color: #4ade80; margin: 0 auto 20px; font-size: 32px;">
              ✓
            </div>

            <h3 style="font-family: var(--font-display); font-size: 26px; color: var(--white); margin-bottom: 8px;">
              Order Received!
            </h3>
            
            <div style="font-size: 13px; color: var(--primary-light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px;">
              Order ID: {{ orderConfirmed.id }}
            </div>

            <p style="font-size: 14px; color: rgba(255,255,255,0.7); margin-bottom: 24px;">
              Our Master Chef is now preparing your culinary selection. Estimated delivery time: 35-45 mins.
            </p>

            <button (click)="closeModal()" class="btn btn-primary" style="width: 100%;">
              Back to Restaurant
            </button>
          </div>

          <div *ngIf="!orderConfirmed && cart.length === 0" style="text-align: center; padding: 40px 0; color: var(--gray);">
            <div style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;">🛍️</div>
            <p style="font-family: var(--font-serif); font-size: 18px;">Your dining cart is empty.</p>
            <button (click)="close.emit()" class="btn btn-gold-outline" style="margin-top: 20px;">
              Explore Menu
            </button>
          </div>

          <div *ngIf="!orderConfirmed && cart.length > 0">
            
            <!-- CART ITEMS LIST -->
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; max-height: 220px; overflow-y: auto; padding-right: 6px;">
              <div
                *ngFor="let item of cart"
                style="display: flex; align-items: center; justify-content: space-between; background: var(--dark3); padding: 12px 16px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.06);"
              >
                <div style="display: flex; align-items: center; gap: 12px;">
                  <img [src]="item.image" [alt]="item.name" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover;" />
                  <div>
                    <h4 style="font-size: 14px; font-weight: 600; color: var(--white);">{{ item.name }}</h4>
                    <span style="font-size: 12px; color: var(--primary-light);">₹{{ item.price }} each</span>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 16px;">
                  <!-- QUANTITY ADJUSTER -->
                  <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.4); padding: 4px 8px; border-radius: 2px;">
                    <button (click)="updateQuantity(item.id, (item.quantity || 1) - 1)" style="color: var(--white); font-size: 14px;">-</button>
                    <span style="font-size: 13px; font-weight: 600; color: var(--primary-light); min-width: 16px; text-align: center;">
                      {{ item.quantity || 1 }}
                    </span>
                    <button (click)="updateQuantity(item.id, (item.quantity || 1) + 1)" style="color: var(--white); font-size: 14px;">+</button>
                  </div>

                  <span style="font-size: 14px; font-weight: 600; color: var(--white); min-width: 60px; text-align: right;">
                    ₹{{ item.price * (item.quantity || 1) }}
                  </span>

                  <button (click)="removeItem(item.id)" style="color: #ef4444; opacity: 0.8; font-size: 16px; cursor: pointer;">
                    🗑️
                  </button>
                </div>

              </div>
            </div>

            <!-- TOTALS SUMMARY -->
            <div style="background: rgba(192, 132, 252, 0.06); border: 1px solid rgba(192, 132, 252, 0.2); padding: 16px 20px; border-radius: 4px; margin-bottom: 24px; font-size: 13px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: rgba(255,255,255,0.7);">
                <span>Subtotal</span>
                <span>₹{{ subtotal }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: rgba(255,255,255,0.7);">
                <span>Taxes & Restaurant Packaging (5% GST)</span>
                <span>₹{{ tax }}</span>
              </div>
              <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(192, 132, 252, 0.3); padding-top: 10px; margin-top: 6px; font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--gold);">
                <span>Grand Total</span>
                <span>₹{{ total }}</span>
              </div>
            </div>

            <!-- CHECKOUT FORM -->
            <form (ngSubmit)="handleCheckout()">
              <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--white); margin-bottom: 14px;">
                Delivery Details & Payment
              </h4>

              <div *ngIf="errorMsg" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; padding: 12px 16px; border-radius: 4px; font-size: 13px; margin-bottom: 20px;">
                ⚠️ {{ errorMsg }}
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-input"
                    required
                    placeholder="e.g. Priya Verma"
                    [(ngModel)]="customerName"
                    name="customerName"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Contact Phone (10 Digits)</label>
                  <input
                    type="tel"
                    class="form-input"
                    required
                    placeholder="10-digit mobile number"
                    maxlength="10"
                    [(ngModel)]="phone"
                    (input)="onPhoneInput($event)"
                    name="phone"
                  />
                </div>
              </div>

              <!-- ADDRESS LINE 1 AND ADDRESS LINE 2 -->
              <div class="form-group">
                <label class="form-label">Address Line 1 (Flat / Villa No, Building, Street)</label>
                <input
                  type="text"
                  class="form-input"
                  required
                  placeholder="e.g. Villa 14, Royal Palm Avenue, Road No. 36"
                  [(ngModel)]="addressLine1"
                  name="addressLine1"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Address Line 2 (Area, Landmark, City)</label>
                <input
                  type="text"
                  class="form-input"
                  placeholder="e.g. Near Metro Station, Jubilee Hills, Hyderabad"
                  [(ngModel)]="addressLine2"
                  name="addressLine2"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Payment Mode</label>
                <select class="form-select" [(ngModel)]="paymentMethod" name="paymentMethod">
                  <option value="UPI / GPay">Instant UPI / GPay / PhonePe</option>
                  <option value="Credit/Debit Card">Credit / Debit Card</option>
                  <option value="Pay on Delivery">Cash / Card on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                [disabled]="loading"
                class="btn btn-primary"
                style="width: 100%; padding: 14px; font-size: 12px;"
              >
                <span>{{ loading ? 'Processing Order...' : ('Place Gourmet Order (₹' + total + ')') }}</span>
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  `
})
export class CartModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  cart: MenuItem[] = [];
  customerName = '';
  phone = '';
  addressLine1 = '';
  addressLine2 = '';
  paymentMethod = 'UPI / GPay';
  loading = false;
  errorMsg = '';
  orderConfirmed: Order | null = null;

  constructor(private cartService: CartService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  get subtotal(): number { return this.cartService.getSubtotal(); }
  get tax(): number { return this.cartService.getTax(); }
  get total(): number { return this.cartService.getTotal(); }

  updateQuantity(id: string, qty: number): void {
    this.cartService.updateQuantity(id, qty);
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/[^0-9]/g, '').slice(0, 10);
    this.phone = digits;
    if (digits.length > 0 && digits.length < 10) {
      this.errorMsg = 'Phone number must be exactly 10 digits.';
    } else {
      this.errorMsg = '';
    }
  }

  handleCheckout(): void {
    const cleanPhone = this.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      this.errorMsg = 'Invalid phone number! Please enter exactly 10 digits.';
      return;
    }

    if (!this.addressLine1.trim()) {
      this.errorMsg = 'Address Line 1 is required.';
      return;
    }

    this.errorMsg = '';
    this.loading = true;

    const fullAddress = `${this.addressLine1.trim()}, ${this.addressLine2.trim()}`.replace(/,\s*$/, '');

    this.apiService.createOrder({
      customerName: this.customerName,
      phone: cleanPhone,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      address: fullAddress,
      items: this.cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity || 1 })),
      totalAmount: this.total,
      paymentMethod: this.paymentMethod
    }).subscribe({
      next: (order) => {
        this.loading = false;
        this.orderConfirmed = order;
        this.cartService.clearCart();
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.error || 'Failed to process order.';
      }
    });
  }

  closeModal(): void {
    this.orderConfirmed = null;
    this.close.emit();
  }
}
