import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { StoryComponent } from './components/story/story.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignaturesComponent } from './components/signatures/signatures.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LocationsComponent } from './components/locations/locations.component';
import { FooterComponent } from './components/footer/footer.component';

import { ReservationModalComponent } from './components/modals/reservation-modal.component';
import { CartModalComponent } from './components/modals/cart-modal.component';
import { DishDetailModalComponent } from './components/modals/dish-detail-modal.component';
import { AdminModalComponent } from './components/modals/admin-modal.component';

import { MenuItem } from './models/models';
import { CartService } from './services/cart.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    MarqueeComponent,
    StoryComponent,
    MenuComponent,
    SignaturesComponent,
    GalleryComponent,
    ReviewsComponent,
    LocationsComponent,
    FooterComponent,
    ReservationModalComponent,
    CartModalComponent,
    DishDetailModalComponent,
    AdminModalComponent
  ],
  template: `
    <div class="app-container">
      <app-navbar 
        (openReservation)="isReservationOpen = true"
        (openCart)="isCartOpen = true"
        (openAdmin)="isAdminOpen = true">
      </app-navbar>

      <main>
        <app-hero 
          (openReservation)="isReservationOpen = true"
          (exploreMenu)="scrollToMenu()">
        </app-hero>

        <app-marquee></app-marquee>

        <app-story></app-story>

        <app-signatures 
          [menu]="menuItems"
          (selectDish)="onSelectDish($event)">
        </app-signatures>

        <app-menu 
          [menu]="menuItems"
          (selectDish)="onSelectDish($event)"
          (addToCart)="onAddToCart($event)">
        </app-menu>

        <app-gallery></app-gallery>

        <app-reviews></app-reviews>

        <app-locations 
          (selectLocationForReservation)="onReserveLocation($event.id)">
        </app-locations>
      </main>

      <app-footer 
        (openReservation)="isReservationOpen = true"
        (openAdmin)="isAdminOpen = true">
      </app-footer>

      <!-- Modals -->
      <app-reservation-modal 
        [isOpen]="isReservationOpen" 
        [selectedLocationId]="preselectedLocationId"
        (close)="isReservationOpen = false">
      </app-reservation-modal>

      <app-cart-modal 
        [isOpen]="isCartOpen" 
        (close)="isCartOpen = false">
      </app-cart-modal>

      <app-dish-detail-modal 
        [isOpen]="isDishDetailOpen" 
        [dish]="selectedDish"
        (close)="isDishDetailOpen = false">
      </app-dish-detail-modal>

      <app-admin-modal 
        [isOpen]="isAdminOpen" 
        (close)="isAdminOpen = false">
      </app-admin-modal>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--bg-dark);
      color: var(--text-light);
    }
  `]
})
export class AppComponent implements OnInit {
  isReservationOpen: boolean = false;
  isCartOpen: boolean = false;
  isDishDetailOpen: boolean = false;
  isAdminOpen: boolean = false;

  menuItems: MenuItem[] = [];
  selectedDish: MenuItem | null = null;
  preselectedLocationId: string = '1';

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getMenu().subscribe({
      next: (data) => this.menuItems = data,
      error: (err) => console.error('Error fetching menu items:', err)
    });
  }

  scrollToMenu(): void {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSelectDish(dish: MenuItem): void {
    this.selectedDish = dish;
    this.isDishDetailOpen = true;
  }

  onAddToCart(dish: MenuItem): void {
    this.cartService.addToCart(dish, 1);
  }

  onReserveLocation(locationId: string): void {
    this.preselectedLocationId = locationId;
    this.isReservationOpen = true;
  }
}
