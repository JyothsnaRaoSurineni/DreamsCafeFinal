import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from '../../models/models';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="menu" style="padding: 130px 0; background: var(--dark);">
      <div class="container">
        
        <!-- HEADER -->
        <div style="text-align: center; max-width: 650px; margin: 0 auto 50px;">
          <div class="section-label" style="justify-content: center;">Artisanal Creations</div>
          <h2
            style="font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; color: var(--white); margin-bottom: 16px;"
          >
            The Culinary Canvas
          </h2>
          <p style="font-family: var(--font-serif); font-size: 18px; color: var(--gray-light); font-style: italic;">
            Freshly prepared to order using hand-pounded spices, cold-pressed oils, and royal court traditions.
          </p>
        </div>

        <!-- CONTROLS: CATEGORIES & SEARCH & DIET FILTER -->
        <div style="margin-bottom: 40px;">
          
          <!-- CATEGORY TABS -->
          <div
            style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;"
          >
            <button
              *ngFor="let cat of categories"
              (click)="activeCategory = cat"
              [style.color]="activeCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.5)'"
              [style.background]="activeCategory === cat ? 'rgba(192, 132, 252, 0.12)' : 'transparent'"
              [style.border]="activeCategory === cat ? '1px solid var(--primary)' : '1px solid transparent'"
              style="padding: 10px 20px; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 2px; transition: all 0.3s ease;"
            >
              {{ cat }}
            </button>
          </div>

          <!-- SEARCH BAR & DIET SELECTOR -->
          <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: space-between; align-items: center;">
            
            <!-- SEARCH -->
            <div style="position: relative; flex: 1 1 300px; max-width: 400px;">
              <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--primary);">🔍</span>
              <input
                type="text"
                placeholder="Search dish, ingredient, or flavor..."
                [(ngModel)]="searchQuery"
                class="form-input"
                style="padding-left: 40px; padding-right: 16px; border-radius: 2px; font-size: 13px;"
              />
            </div>

            <!-- DIET TOGGLES -->
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--gray);">Preference:</span>
              <button
                *ngFor="let diet of ['All', 'Veg', 'Non-Veg']"
                (click)="activeDiet = diet"
                [style.background]="activeDiet === diet ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255,255,255,0.04)'"
                [style.color]="activeDiet === diet ? 'var(--primary)' : 'rgba(255,255,255,0.6)'"
                [style.border]="activeDiet === diet ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)'"
                style="padding: 6px 14px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 2px;"
              >
                {{ diet }}
              </button>
            </div>
          </div>
        </div>

        <!-- MENU ITEMS GRID -->
        <div *ngIf="filteredMenu.length === 0" style="text-align: center; padding: 60px 0; color: var(--gray);">
          <p style="font-size: 16px; font-family: var(--font-serif);">No menu items match your current filter or search criteria.</p>
        </div>

        <div
          *ngIf="filteredMenu.length > 0"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;"
        >
          <div
            *ngFor="let item of filteredMenu"
            (click)="selectDish.emit(item)"
            style="background: var(--dark2); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease;"
          >
            <!-- DISH IMAGE HEADER -->
            <div style="position: relative; height: 200px; overflow: hidden;">
              <img
                [src]="item.image"
                [alt]="item.name"
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
              />
              <div
                style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(23,28,53,1) 0%, transparent 60%);"
              ></div>

              <!-- BADGES -->
              <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 6px;">
                <span [class]="'badge-diet ' + (item.diet === 'Veg' ? 'badge-veg' : 'badge-nonveg')">
                  {{ item.diet }}
                </span>
                <span *ngIf="item.isChefSpecial" class="badge-diet badge-chef">
                  ★ Royal Special
                </span>
              </div>

              <!-- RATING -->
              <div
                style="position: absolute; top: 12px; right: 12px; background: rgba(8, 9, 20, 0.85); backdrop-filter: blur(8px); padding: 4px 8px; border-radius: 2px; font-size: 11px; font-weight: 600; color: var(--gold); display: flex; align-items: center; gap: 4px;"
              >
                <span>★</span> {{ item.rating || '4.9' }}
              </div>
            </div>

            <!-- CONTENT -->
            <div style="padding: 20px 24px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                  <h3 style="font-family: var(--font-display); font-size: 18px; font-weight: 500; color: var(--white);">
                    {{ item.name }}
                  </h3>
                  <span style="font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--gold); white-space: nowrap;">
                    ₹{{ item.price }}
                  </span>
                </div>

                <p style="font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 16px;">
                  {{ item.description }}
                </p>
              </div>

              <!-- BOTTOM ROW: SPICE LEVEL + ADD BUTTON -->
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 14px; margin-top: 10px;">
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span *ngFor="let s of getSpiceArray(item.spicyLevel)" style="color: #ef4444; font-size: 12px;">🔥</span>
                  <span *ngIf="item.spicyLevel === 0" style="font-size: 11px; color: rgba(255,255,255,0.4);">Mild & Delicate</span>
                </div>

                <button
                  (click)="handleAdd($event, item)"
                  [style.background]="addedItemId === item.id ? 'var(--primary)' : 'rgba(192, 132, 252, 0.15)'"
                  [style.color]="addedItemId === item.id ? 'var(--black)' : 'var(--primary-light)'"
                  style="border: 1px solid var(--primary); padding: 8px 16px; border-radius: 2px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; transition: all 0.3s;"
                >
                  <span *ngIf="addedItemId === item.id">Added!</span>
                  <span *ngIf="addedItemId !== item.id">+ Add to Order</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class MenuComponent {
  @Input() menu: MenuItem[] = [];
  @Output() addToCart = new EventEmitter<MenuItem>();
  @Output() selectDish = new EventEmitter<MenuItem>();

  activeCategory = 'All';
  activeDiet = 'All';
  searchQuery = '';
  addedItemId: string | null = null;

  categories = ['All', 'Starters', 'Main Course', 'Biryanis & Rice', 'Cocktails & Beverages', 'Desserts'];

  get filteredMenu(): MenuItem[] {
    return this.menu.filter(item => {
      const matchCat = this.activeCategory === 'All' || item.category.toLowerCase() === this.activeCategory.toLowerCase();
      const matchDiet = this.activeDiet === 'All' || item.diet.toLowerCase() === this.activeDiet.toLowerCase();
      const query = this.searchQuery.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      return matchCat && matchDiet && matchSearch;
    });
  }

  getSpiceArray(level: number): number[] {
    return Array(level || 0).fill(0);
  }

  handleAdd(event: Event, item: MenuItem): void {
    event.stopPropagation();
    this.addToCart.emit(item);
    this.addedItemId = item.id;
    setTimeout(() => this.addedItemId = null, 1200);
  }
}
