import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Analytics, Reservation, Order, Subscriber, MenuItem } from '../../models/models';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="admin-overlay" (click)="onBackdropClick($event)">
      <div class="admin-card" (click)="$event.stopPropagation()">
        
        <!-- Header -->
        <div class="admin-header">
          <div class="admin-title-area">
            <h2 class="admin-heading">Dreams Portal</h2>
            <span class="admin-badge">Admin Workspace</span>
          </div>
          <button class="admin-close-btn" (click)="closeModal()" aria-label="Close admin modal">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="admin-nav">
          <button 
            *ngFor="let tab of tabs" 
            [class.active]="activeTab === tab.id"
            (click)="selectTab(tab.id)"
            class="admin-nav-tab">
            {{ tab.label }}
            <span *ngIf="tab.id === 'subscribers' && subscribers.length" class="nav-count">{{ subscribers.length }}</span>
            <span *ngIf="tab.id === 'reservations' && reservations.length" class="nav-count">{{ reservations.length }}</span>
            <span *ngIf="tab.id === 'orders' && orders.length" class="nav-count">{{ orders.length }}</span>
          </button>
        </div>

        <!-- Body Content -->
        <div class="admin-body">
          <div *ngIf="loading" class="admin-loading">
            <div class="spinner"></div>
            <p>Fetching latest telemetry data...</p>
          </div>

          <div *ngIf="!loading">
            
            <!-- Tab 1: Analytics -->
            <div *ngIf="activeTab === 'analytics'" class="tab-content">
              <div class="metrics-grid" *ngIf="analytics">
                <div class="metric-card">
                  <span class="metric-label">Total Revenue</span>
                  <span class="metric-value gold">₹{{ analytics.totalRevenue | number }}</span>
                </div>
                <div class="metric-card">
                  <span class="metric-label">Total Orders</span>
                  <span class="metric-value">{{ analytics.totalOrders }}</span>
                </div>
                <div class="metric-card">
                  <span class="metric-label">Reservations</span>
                  <span class="metric-value">{{ analytics.totalReservations }}</span>
                </div>
                <div class="metric-card">
                  <span class="metric-label">Pending Bookings</span>
                  <span class="metric-value highlight">{{ analytics.pendingReservations }}</span>
                </div>
                <div class="metric-card">
                  <span class="metric-label">VIP Subscribers</span>
                  <span class="metric-value purple">{{ analytics.totalSubscribers }}</span>
                </div>
                <div class="metric-card">
                  <span class="metric-label">Active Menu Items</span>
                  <span class="metric-value">{{ analytics.activeMenuItems }}</span>
                </div>
              </div>
            </div>

            <!-- Tab 2: Reservations -->
            <div *ngIf="activeTab === 'reservations'" class="tab-content">
              <div class="table-responsive">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Location</th>
                      <th>Guests & Time</th>
                      <th>Phone</th>
                      <th>Seating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let res of reservations">
                      <td class="font-medium">{{ res.guestName }}</td>
                      <td>{{ res.locationName }}</td>
                      <td>{{ res.guests }} Guests • {{ res.date }} ({{ res.time }})</td>
                      <td>{{ res.phone }}</td>
                      <td><span class="pill-tag">{{ res.seating }}</span></td>
                      <td>
                        <span class="status-badge" [class]="res.status.toLowerCase()">
                          {{ res.status }}
                        </span>
                      </td>
                      <td>
                        <select 
                          [ngModel]="res.status" 
                          (ngModelChange)="updateReservationStatus(res.id, $event)"
                          class="status-select">
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                    <tr *ngIf="reservations.length === 0">
                      <td colspan="7" class="empty-row">No reservations recorded yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 3: Orders -->
            <div *ngIf="activeTab === 'orders'" class="tab-content">
              <div class="table-responsive">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Delivery Address</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let ord of orders">
                      <td><code class="order-id">#{{ ord.id.slice(-6) }}</code></td>
                      <td>
                        <div>{{ ord.customerName }}</div>
                        <div class="sub-text">{{ ord.phone }}</div>
                      </td>
                      <td>
                        <div *ngFor="let item of ord.items" class="order-item-line">
                          {{ item.quantity }}x {{ item.name }}
                        </div>
                      </td>
                      <td class="address-cell">
                        <div>{{ ord.addressLine1 || ord.address }}</div>
                        <div *ngIf="ord.addressLine2" class="sub-text">{{ ord.addressLine2 }}</div>
                      </td>
                      <td class="font-bold gold">₹{{ ord.totalAmount }}</td>
                      <td>
                        <span class="status-badge" [class]="ord.status.toLowerCase()">
                          {{ ord.status }}
                        </span>
                      </td>
                      <td>
                        <select 
                          [ngModel]="ord.status" 
                          (ngModelChange)="updateOrderStatus(ord.id, $event)"
                          class="status-select">
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                    <tr *ngIf="orders.length === 0">
                      <td colspan="7" class="empty-row">No active online orders.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 4: VIP Subscriptions -->
            <div *ngIf="activeTab === 'subscribers'" class="tab-content">
              <div class="vip-sub-header">
                <h3>Private Invitation VIP Members</h3>
                <p>Emails registered through the VIP invitation portal for exclusive tastings and events.</p>
              </div>

              <div class="table-responsive">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email Address</th>
                      <th>Subscribed On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let sub of subscribers; let i = index">
                      <td>{{ i + 1 }}</td>
                      <td class="gold font-medium">{{ sub.email }}</td>
                      <td class="sub-text">{{ sub.createdAt | date:'medium' }}</td>
                    </tr>
                    <tr *ngIf="subscribers.length === 0">
                      <td colspan="3" class="empty-row">No VIP subscriptions yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 5: Menu Manager -->
            <div *ngIf="activeTab === 'menu'" class="tab-content">
              <div class="menu-manager-grid">
                <!-- Add New Dish Form -->
                <div class="new-dish-card">
                  <h4>Add New Masterpiece</h4>
                  <form (ngSubmit)="addNewDish()" class="new-dish-form">
                    <div class="form-group">
                      <label>Dish Name</label>
                      <input type="text" [(ngModel)]="newDish.name" name="name" required placeholder="e.g. Royal Truffle Galouti" class="admin-input" />
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label>Category</label>
                        <select [(ngModel)]="newDish.category" name="category" class="admin-input">
                          <option value="Starters">Starters</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Breads & Biryani">Breads & Biryani</option>
                          <option value="Desserts">Desserts</option>
                          <option value="Beverages">Beverages</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Price (₹)</label>
                        <input type="number" [(ngModel)]="newDish.price" name="price" required min="1" class="admin-input" />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label>Dietary Type</label>
                        <select [(ngModel)]="newDish.diet" name="diet" class="admin-input">
                          <option value="Veg">Veg</option>
                          <option value="Non-Veg">Non-Veg</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Spiciness (0-3)</label>
                        <input type="number" [(ngModel)]="newDish.spicyLevel" name="spicyLevel" min="0" max="3" class="admin-input" />
                      </div>
                    </div>

                    <div class="form-group">
                      <label>Image URL</label>
                      <input type="url" [(ngModel)]="newDish.image" name="image" required placeholder="https://images.unsplash.com/..." class="admin-input" />
                    </div>

                    <div class="form-group">
                      <label>Description</label>
                      <textarea [(ngModel)]="newDish.description" name="description" rows="2" placeholder="Brief epicurean description..." class="admin-input"></textarea>
                    </div>

                    <div class="checkbox-group">
                      <input type="checkbox" id="isChefSpecial" [(ngModel)]="newDish.isChefSpecial" name="isChefSpecial" />
                      <label for="isChefSpecial">Mark as Chef's Signature</label>
                    </div>

                    <button type="submit" class="btn btn-primary w-full mt-2">Publish Dish</button>
                  </form>
                </div>

                <!-- Existing Dishes List -->
                <div class="existing-dishes-card">
                  <h4>Current Menu ({{ menuItems.length }})</h4>
                  <div class="dishes-scroll-list">
                    <div *ngFor="let item of menuItems" class="dish-item-row">
                      <img [src]="item.image" [alt]="item.name" class="dish-thumb" />
                      <div class="dish-meta">
                        <div class="dish-meta-title">{{ item.name }}</div>
                        <div class="dish-meta-sub">{{ item.category }} • ₹{{ item.price }}</div>
                      </div>
                      <button (click)="deleteDish(item.id)" class="delete-btn" title="Remove dish">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .admin-overlay {
      position: fixed;
      inset: 0;
      background: rgba(8, 6, 18, 0.88);
      backdrop-filter: blur(14px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease-out;
    }

    .admin-card {
      background: #120e24;
      border: 1px solid rgba(192, 132, 252, 0.25);
      border-radius: var(--radius-lg);
      max-width: 1000px;
      width: 100%;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85);
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.4);
    }

    .admin-title-area {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .admin-heading {
      font-family: 'Cinzel', serif;
      font-size: 1.4rem;
      color: var(--text-light);
    }

    .admin-badge {
      font-size: 0.7rem;
      background: linear-gradient(135deg, var(--primary-accent), var(--gold-accent));
      color: #0b0817;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .admin-close-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-fast);
    }

    .admin-close-btn:hover {
      color: #fff;
      background: rgba(239, 68, 68, 0.3);
    }

    .admin-nav {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(10, 8, 20, 0.5);
      overflow-x: auto;
    }

    .admin-nav-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 1rem 1.5rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-fast);
      border-bottom: 2px solid transparent;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .admin-nav-tab:hover {
      color: var(--text-light);
    }

    .admin-nav-tab.active {
      color: var(--gold-accent);
      border-bottom-color: var(--gold-accent);
      background: rgba(245, 158, 11, 0.05);
    }

    .nav-count {
      background: rgba(192, 132, 252, 0.2);
      color: var(--primary-accent);
      font-size: 0.75rem;
      padding: 0.1rem 0.45rem;
      border-radius: 10px;
    }

    .admin-body {
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }

    .admin-loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(192, 132, 252, 0.15);
      border-top-color: var(--primary-accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
    }

    .metric-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .metric-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }

    .metric-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-light);
    }

    .metric-value.gold { color: var(--gold-accent); }
    .metric-value.purple { color: var(--primary-accent); }
    .metric-value.highlight { color: #f43f5e; }

    /* Tables */
    .table-responsive {
      width: 100%;
      overflow-x: auto;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
      text-align: left;
    }

    .admin-table th {
      padding: 0.75rem 1rem;
      background: rgba(255, 255, 255, 0.04);
      color: var(--text-muted);
      font-weight: 600;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .admin-table td {
      padding: 0.9rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      color: var(--text-light);
    }

    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 700; }
    .gold { color: var(--gold-accent); }

    .sub-text {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .pill-tag {
      background: rgba(255, 255, 255, 0.06);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }

    .status-badge.confirmed, .status-badge.delivered {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .status-badge.preparing, .status-badge.out\\ for\\ delivery {
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
    }

    .status-badge.cancelled {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .status-select {
      background: var(--bg-surface);
      color: var(--text-light);
      border: 1px solid var(--border-color);
      padding: 0.35rem 0.6rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
    }

    .order-id {
      background: rgba(192, 132, 252, 0.15);
      color: var(--primary-accent);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }

    .address-cell {
      max-width: 220px;
    }

    .empty-row {
      text-align: center;
      color: var(--text-muted);
      padding: 2.5rem !important;
    }

    .vip-sub-header {
      margin-bottom: 1.5rem;
    }

    .vip-sub-header h3 {
      font-family: 'Cinzel', serif;
      color: var(--gold-accent);
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
    }

    .vip-sub-header p {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    /* Menu Manager */
    .menu-manager-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 800px) {
      .menu-manager-grid {
        grid-template-columns: 1fr;
      }
    }

    .new-dish-card, .existing-dishes-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-md);
      padding: 1.5rem;
    }

    .new-dish-card h4, .existing-dishes-card h4 {
      font-family: 'Cinzel', serif;
      color: var(--text-light);
      margin-bottom: 1.25rem;
      font-size: 1.1rem;
    }

    .new-dish-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .form-group label {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .admin-input {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-light);
      padding: 0.6rem 0.8rem;
      border-radius: var(--radius-sm);
      font-family: inherit;
      font-size: 0.85rem;
    }

    .admin-input:focus {
      outline: none;
      border-color: var(--primary-accent);
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .dishes-scroll-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .dish-item-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.6rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .dish-thumb {
      width: 48px;
      height: 48px;
      border-radius: 6px;
      object-fit: cover;
    }

    .dish-meta {
      flex: 1;
    }

    .dish-meta-title {
      font-weight: 600;
      color: var(--text-light);
      font-size: 0.9rem;
    }

    .dish-meta-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .delete-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      padding: 0.3rem;
      border-radius: 4px;
      transition: var(--transition-fast);
    }

    .delete-btn:hover {
      background: rgba(239, 68, 68, 0.2);
    }

    .w-full { width: 100%; }
    .mt-2 { margin-top: 0.5rem; }
  `]
})
export class AdminModalComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  activeTab: string = 'analytics';
  loading: boolean = false;

  analytics: Analytics | null = null;
  reservations: Reservation[] = [];
  orders: Order[] = [];
  subscribers: Subscriber[] = [];
  menuItems: MenuItem[] = [];

  tabs = [
    { id: 'analytics', label: 'Dashboard' },
    { id: 'reservations', label: 'Bookings' },
    { id: 'orders', label: 'Orders' },
    { id: 'subscribers', label: 'VIP Members' },
    { id: 'menu', label: 'Menu Manager' }
  ];

  newDish: any = {
    name: '',
    category: 'Starters',
    price: 350,
    diet: 'Veg',
    spicyLevel: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    description: '',
    isChefSpecial: false
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.isOpen) {
      this.loadAllData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.loadAllData();
    }
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  loadAllData(): void {
    this.loading = true;
    
    this.apiService.getAnalytics().subscribe(data => this.analytics = data);
    this.apiService.getReservations().subscribe(data => this.reservations = data);
    this.apiService.getOrders().subscribe(data => this.orders = data);
    this.apiService.getSubscribers().subscribe(data => this.subscribers = data);
    this.apiService.getMenu().subscribe(data => {
      this.menuItems = data;
      this.loading = false;
    });
  }

  updateReservationStatus(id: string, status: string): void {
    this.apiService.updateReservationStatus(id, status).subscribe(updated => {
      const idx = this.reservations.findIndex(r => r.id === id);
      if (idx !== -1) {
        this.reservations[idx] = updated;
      }
      this.apiService.getAnalytics().subscribe(data => this.analytics = data);
    });
  }

  updateOrderStatus(id: string, status: string): void {
    this.apiService.updateOrderStatus(id, status).subscribe(updated => {
      const idx = this.orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        this.orders[idx] = updated;
      }
      this.apiService.getAnalytics().subscribe(data => this.analytics = data);
    });
  }

  addNewDish(): void {
    if (!this.newDish.name || !this.newDish.price || !this.newDish.image) return;

    this.apiService.addMenuItem(this.newDish).subscribe(dish => {
      this.menuItems.unshift(dish);
      this.newDish = {
        name: '',
        category: 'Starters',
        price: 350,
        diet: 'Veg',
        spicyLevel: 1,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
        description: '',
        isChefSpecial: false
      };
      this.apiService.getAnalytics().subscribe(data => this.analytics = data);
    });
  }

  deleteDish(id: string): void {
    if (confirm('Are you sure you want to remove this dish from the menu?')) {
      this.apiService.deleteMenuItem(id).subscribe(() => {
        this.menuItems = this.menuItems.filter(item => item.id !== id);
        this.apiService.getAnalytics().subscribe(data => this.analytics = data);
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    this.closeModal();
  }
}
