import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../models/models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dish-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen && dish" class="modal-overlay" (click)="onBackdropClick($event)">
      <div class="modal-card dish-detail-card" (click)="$event.stopPropagation()">
        <button class="modal-close-btn" (click)="closeModal()" aria-label="Close modal">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div class="dish-detail-grid">
          <div class="dish-detail-image-wrapper">
            <img [src]="dish.image" [alt]="dish.name" class="dish-detail-img" />
            <span *ngIf="dish.isChefSpecial" class="chef-badge-overlay">Chef's Choice</span>
          </div>

          <div class="dish-detail-info">
            <div class="dish-header-row">
              <span class="diet-pill" [class.veg]="dish.diet === 'Veg'" [class.non-veg]="dish.diet === 'Non-Veg'">
                {{ dish.diet }}
              </span>
              <span class="category-pill">{{ dish.category }}</span>
              <span *ngIf="dish.rating" class="rating-pill">★ {{ dish.rating }}</span>
            </div>

            <h2 class="dish-title">{{ dish.name }}</h2>
            <p class="dish-price">₹{{ dish.price }}</p>
            
            <p class="dish-description">{{ dish.description }}</p>

            <div class="spicy-level-row" *ngIf="dish.spicyLevel > 0">
              <span class="spicy-label">Spiciness:</span>
              <div class="chili-icons">
                <span *ngFor="let c of [].constructor(dish.spicyLevel)" class="chili-icon">🌶️</span>
              </div>
            </div>

            <div class="quantity-add-container">
              <div class="quantity-selector">
                <button type="button" (click)="decreaseQty()" [disabled]="quantity <= 1" class="qty-btn">-</button>
                <span class="qty-val">{{ quantity }}</span>
                <button type="button" (click)="increaseQty()" class="qty-btn">+</button>
              </div>

              <button class="btn btn-primary add-to-cart-btn" (click)="handleAddToCart()">
                Add to Order • ₹{{ dish.price * quantity }}
              </button>
            </div>

            <div *ngIf="addedSuccess" class="added-toast">
              Added {{ quantity }}x {{ dish.name }} to your cart!
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 8, 20, 0.85);
      backdrop-filter: blur(12px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease-out;
    }

    .dish-detail-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      max-width: 820px;
      width: 100%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }

    .modal-close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-muted);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .modal-close-btn:hover {
      color: #fff;
      background: rgba(239, 68, 68, 0.8);
      border-color: transparent;
    }

    .dish-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 768px) {
      .dish-detail-grid {
        grid-template-columns: 1fr;
      }
    }

    .dish-detail-image-wrapper {
      position: relative;
      height: 100%;
      min-height: 300px;
      background: var(--bg-surface);
    }

    .dish-detail-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .chef-badge-overlay {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background: linear-gradient(135deg, var(--gold-accent), var(--gold-hover));
      color: #0d0b18;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.35rem 0.85rem;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .dish-detail-info {
      padding: 2.25rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .dish-header-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.75rem;
    }

    .diet-pill {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      text-transform: uppercase;
    }

    .diet-pill.veg {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .diet-pill.non-veg {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .category-pill {
      font-size: 0.75rem;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
    }

    .rating-pill {
      font-size: 0.75rem;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      margin-left: auto;
    }

    .dish-title {
      font-family: 'Cinzel', serif;
      font-size: 1.75rem;
      color: var(--text-light);
      margin-bottom: 0.5rem;
    }

    .dish-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-accent);
      margin-bottom: 1rem;
    }

    .dish-description {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }

    .spicy-level-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .spicy-label {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .quantity-add-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .qty-btn {
      background: transparent;
      border: none;
      color: var(--text-light);
      width: 38px;
      height: 38px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .qty-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
    }

    .qty-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .qty-val {
      width: 32px;
      text-align: center;
      font-weight: 700;
      color: var(--text-light);
    }

    .add-to-cart-btn {
      flex: 1;
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
    }

    .added-toast {
      margin-top: 1rem;
      background: rgba(34, 197, 94, 0.15);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #4ade80;
      padding: 0.6rem;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      text-align: center;
      animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class DishDetailModalComponent implements OnChanges {
  @Input() dish: MenuItem | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  quantity: number = 1;
  addedSuccess: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dish'] || changes['isOpen']) {
      this.quantity = 1;
      this.addedSuccess = false;
    }
  }

  increaseQty(): void {
    this.quantity++;
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  handleAddToCart(): void {
    if (!this.dish) return;
    this.cartService.addToCart(this.dish, this.quantity);
    this.addedSuccess = true;
    setTimeout(() => {
      this.addedSuccess = false;
      this.closeModal();
    }, 1000);
  }

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    this.closeModal();
  }
}
