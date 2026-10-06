import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/models';

@Component({
  selector: 'app-signatures',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="signatures" style="padding: 130px 0; background: var(--black);">
      <div class="container">
        
        <!-- HEADER -->
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 60px; flex-wrap: wrap; gap: 20px;">
          <div>
            <div class="section-label">Chef's Masterpieces</div>
            <h2
              style="font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; color: var(--white); line-height: 1.1;"
            >
              Crown Jewels of <br />
              <em style="font-style: italic; color: var(--primary-light);">Our Nizami Kitchen.</em>
            </h2>
          </div>

          <a href="#menu" class="btn btn-gold-outline">
            <span>Explore Full Collection →</span>
          </a>
        </div>

        <!-- SIGNATURE DISHES CARDS GRID -->
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;"
        >
          <div
            *ngFor="let dish of signatures; let idx = index"
            (click)="selectDish.emit(dish)"
            style="position: relative; height: 480px; border-radius: 4px; overflow: hidden; cursor: pointer; box-shadow: 0 15px 35px rgba(0,0,0,0.6);"
          >
            <!-- IMAGE -->
            <img
              [src]="dish.image"
              [alt]="dish.name"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease-out);"
            />

            <!-- OVERLAY GRADIENT -->
            <div
              style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,9,20,0.95) 0%, rgba(8,9,20,0.4) 60%, transparent 100%);"
            ></div>

            <!-- BADGE -->
            <div
              style="position: absolute; top: 20px; left: 20px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: var(--white); padding: 6px 14px; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border-radius: 2px; display: flex; align-items: center; gap: 6px;"
            >
              <span>✨ Signature #0{{ idx + 1 }}</span>
            </div>

            <!-- CONTENT AT BOTTOM -->
            <div
              style="position: absolute; bottom: 0; left: 0; right: 0; padding: 32px 28px;"
            >
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                <h3 style="font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--white);">
                  {{ dish.name }}
                </h3>
                <span style="font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--gold);">
                  ₹{{ dish.price }}
                </span>
              </div>

              <p
                style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.6; margin-top: 8px;"
              >
                {{ dish.description }}
              </p>

              <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px;">
                <span style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--primary-light);">
                  Tap to explore recipe details & ingredients →
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class SignaturesComponent {
  @Input() menu: MenuItem[] = [];
  @Output() selectDish = new EventEmitter<MenuItem>();

  get signatures(): MenuItem[] {
    return this.menu.filter(item => item.isChefSpecial).slice(0, 3);
  }
}
