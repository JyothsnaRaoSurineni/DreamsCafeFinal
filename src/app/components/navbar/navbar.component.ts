import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationItem } from '../../models/models';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav
      [style.padding]="scrolled ? '14px 0' : '24px 0'"
      [style.background]="scrolled ? 'rgba(8, 9, 20, 0.95)' : 'linear-gradient(to bottom, rgba(8,9,20,0.92), transparent)'"
      [style.backdrop-filter]="scrolled ? 'blur(16px)' : 'none'"
      [style.border-bottom]="scrolled ? '1px solid rgba(192, 132, 252, 0.2)' : 'none'"
      style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s ease;"
    >
      <div className="container" style="display: flex; align-items: center; justify-content: space-between;">
        
        <!-- LOGO -->
        <a href="#" style="display: flex; align-items: center; gap: 12px;">
          <div
            style="width: 40px; height: 40px; border: 1px solid var(--primary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; color: var(--primary); font-size: 22px; background: rgba(192, 132, 252, 0.12); box-shadow: 0 0 15px rgba(192, 132, 252, 0.2);"
          >
            D
          </div>
          <div>
            <span style="font-family: var(--font-display); font-size: 22px; font-weight: 600; letter-spacing: 1.5px; color: var(--white); display: block; line-height: 1.1;">
              Dreams
            </span>
            <span style="font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); display: block;">
              Kitchen & Bar
            </span>
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <div style="display: none; align-items: center; gap: 32px;" className="desktop-nav">
          <a href="#menu" style="font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.85);">
            Menu
          </a>
          <a href="#signatures" style="font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.85);">
            Signatures
          </a>
          <a href="#story" style="font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.85);">
            Our Story
          </a>
          <a href="#gallery" style="font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.85);">
            Ambiance
          </a>
          <a href="#locations" style="font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.85);">
            Locations
          </a>
        </div>

        <!-- ACTION CONTROLS -->
        <div style="display: flex; align-items: center; gap: 16px;">
          
          <!-- LOCATION SELECTOR -->
          <div style="display: none; align-items: center; gap: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(192, 132, 252, 0.2); padding: 6px 12px; border-radius: 4px;" className="desktop-nav">
            <span style="color: var(--primary); font-size: 14px;">📍</span>
            <select
              [value]="selectedLocation ? selectedLocation.id : ''"
              (change)="onLocationChange($event)"
              style="background: transparent; border: none; color: var(--white); font-size: 11px; font-weight: 500; outline: none; cursor: pointer;"
            >
              <option *ngFor="let loc of locations" [value]="loc.id" style="background: #171c35; color: #fff;">
                {{ loc.name.split(' ')[0] }} ({{ (loc.address.split(',')[1] || '').trim() || 'Hyd' }})
              </option>
            </select>
          </div>

          <!-- CART TRIGGER BUTTON -->
          <button
            (click)="openCart.emit()"
            style="position: relative; background: rgba(192, 132, 252, 0.12); border: 1px solid rgba(192, 132, 252, 0.3); padding: 10px 14px; border-radius: 4px; color: var(--primary-light); display: flex; align-items: center; gap: 8px;"
            title="View Cart & Order"
          >
            <span style="font-size: 16px;">🛍️</span>
            <span style="font-size: 11px; font-weight: 600; letter-spacing: 1px; display: none;" className="cart-text">Order</span>
            <span
              *ngIf="cartCount > 0"
              style="position: absolute; top: -6px; right: -6px; background: var(--gold); color: var(--black); font-size: 10px; font-weight: 700; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"
            >
              {{ cartCount }}
            </span>
          </button>

          <!-- TABLE RESERVATION BUTTON -->
          <button
            (click)="openReservation.emit()"
            class="btn btn-primary"
            style="padding: 10px 20px; font-size: 11px;"
          >
            <span>📅 Book Table</span>
          </button>

          <!-- ADMIN DASHBOARD LINK -->
          <button
            (click)="openAdmin.emit()"
            style="background: transparent; border: 1px solid rgba(255,255,255,0.15); padding: 9px; border-radius: 4px; color: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center;"
            title="Admin Portal"
          >
            <span style="font-size: 16px;">🛡️</span>
          </button>

          <!-- MOBILE HAMBURGER BUTTON -->
          <button
            (click)="mobileOpen = !mobileOpen"
            style="color: var(--white); padding: 6px;"
            className="mobile-toggle"
          >
            <span style="font-size: 20px;">{{ mobileOpen ? '✕' : '☰' }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- MOBILE DRAWER -->
    <div
      *ngIf="mobileOpen"
      style="position: fixed; inset: 0; background: rgba(8, 9, 20, 0.98); z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; animation: fadeIn 0.3s ease-out;"
    >
      <a href="#menu" (click)="mobileOpen = false" style="font-family: var(--font-display); font-size: 26px; color: var(--white);">Menu & Dining</a>
      <a href="#signatures" (click)="mobileOpen = false" style="font-family: var(--font-display); font-size: 26px; color: var(--white);">Signature Dishes</a>
      <a href="#story" (click)="mobileOpen = false" style="font-family: var(--font-display); font-size: 26px; color: var(--white);">Our Story</a>
      <a href="#gallery" (click)="mobileOpen = false" style="font-family: var(--font-display); font-size: 26px; color: var(--white);">Ambiance</a>
      <a href="#locations" (click)="mobileOpen = false" style="font-family: var(--font-display); font-size: 26px; color: var(--white);">Locations</a>

      <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 12px; width: 80%; max-width: 280px;">
        <button (click)="mobileOpen = false; openReservation.emit()" class="btn btn-primary" style="width: 100%;">
          📅 Book a Table
        </button>
        <button (click)="mobileOpen = false; openCart.emit()" class="btn btn-gold-outline" style="width: 100%;">
          🛍️ View Order ({{ cartCount }})
        </button>
      </div>
    </div>

    <style>
      @media (min-width: 900px) {
        .desktop-nav { display: flex !important; }
        .cart-text { display: inline !important; }
        .mobile-toggle { display: none !important; }
      }
    </style>
  `
})
export class NavbarComponent implements OnInit {
  @Input() locations: LocationItem[] = [];
  @Input() selectedLocation: LocationItem | null = null;
  @Output() selectLocation = new EventEmitter<LocationItem>();
  @Output() openCart = new EventEmitter<void>();
  @Output() openReservation = new EventEmitter<void>();
  @Output() openAdmin = new EventEmitter<void>();

  scrolled = false;
  mobileOpen = false;
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrolled = window.scrollY > 40;
    });

    // Subscribe to RxJS cart stream
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getTotalCount();
    });
  }

  onLocationChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const loc = this.locations.find(l => l.id === target.value);
    if (loc) this.selectLocation.emit(loc);
  }
}
