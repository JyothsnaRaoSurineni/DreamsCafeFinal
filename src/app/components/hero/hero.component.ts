import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      style="position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding-top: 80px;"
    >
      <!-- BACKGROUND IMAGE WITH LUXURY GRADIENT OVERLAY -->
      <div
        style="position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85&auto=format&fit=crop'); background-position: center; background-size: cover; background-repeat: no-repeat; transform: scale(1.03); filter: brightness(0.7);"
      ></div>
      
      <div
        style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(8,9,20,0.94) 0%, rgba(15,18,36,0.7) 50%, rgba(8,9,20,0.88) 100%);"
      ></div>

      <!-- HERO CONTENT -->
      <div class="container" style="position: relative; z-index: 2; padding: 120px 0 80px;">
        <div style="max-width: 820px;">
          
          <!-- TAGLINE -->
          <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 28px;">
            <div style="width: 40px; height: 1px; background: var(--primary);"></div>
            <span style="font-size: 11px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--primary-light);">
              Dreams Kitchen & Bar — Fine Dining Destination
            </span>
          </div>

          <!-- MAIN HEADING -->
          <h1
            style="font-family: var(--font-display); font-size: clamp(44px, 6.5vw, 90px); font-weight: 500; line-height: 1.05; color: var(--white); margin-bottom: 24px;"
          >
            Where Culinary Dreams <br />
            <em style="font-style: italic; color: var(--primary-light);">Become Reality.</em>
          </h1>

          <!-- SUBTITLE -->
          <p
            style="font-family: var(--font-serif); font-size: clamp(18px, 2.2vw, 24px); font-weight: 300; color: rgba(255, 255, 255, 0.8); max-width: 580px; line-height: 1.6; margin-bottom: 44px;"
          >
            Immerse yourself in rare Nizami heritage recipes, artisanal wood-fired grills, and avant-garde Dreamscape mixology across 4 luxurious sanctuaries in Hyderabad.
          </p>

          <!-- CTA ACTIONS -->
          <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
            <button (click)="openReservation.emit()" class="btn btn-primary">
              <span>📅 Reserve a Table</span>
            </button>

            <a href="#menu" class="btn btn-outline">
              <span>🍴 View Signature Menu</span>
            </a>
          </div>
        </div>

        <!-- FLOATING RATING BADGE -->
        <div
          style="position: absolute; right: 32px; bottom: 80px; background: rgba(23, 28, 53, 0.8); backdrop-filter: blur(16px); border: 1px solid rgba(192, 132, 252, 0.3); padding: 24px 32px; border-radius: 4px; text-align: right; display: none;"
          className="desktop-rating"
        >
          <div
            style="font-family: var(--font-display); font-size: 52px; font-weight: 600; color: var(--gold); line-height: 1;"
          >
            4.9★
          </div>
          <div style="color: var(--gold); font-size: 12px; letter-spacing: 2px; margin: 6px 0;">
            ★★★★★
          </div>
          <div style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.7);">
            1,200+ Verified Reviews
          </div>
        </div>
      </div>

      <!-- SCROLL INDICATOR -->
      <a
        href="#marquee"
        style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.5);"
      >
        <span style="font-size: 10px; letter-spacing: 3px; text-transform: uppercase;">Discover</span>
        <span style="color: var(--primary); font-size: 14px;">↓</span>
      </a>

      <style>
        @media (min-width: 992px) {
          .desktop-rating { display: block !important; }
        }
      </style>
    </section>
  `
})
export class HeroComponent {
  @Output() openReservation = new EventEmitter<void>();
}
