import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="marquee"
      style="background: linear-gradient(90deg, #9333ea 0%, #c084fc 50%, #f59e0b 100%); padding: 14px 0; overflow: hidden; white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,0.6);"
    >
      <div style="display: inline-flex; animation: marqueeScroll 30s linear infinite;">
        <div
          *ngFor="let item of marqueeItems"
          style="font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #080914; padding: 0 36px; display: inline-flex; align-items: center; gap: 36px;"
        >
          <span>{{ item }}</span>
          <span style="opacity: 0.4; font-size: 14px;">◆</span>
        </div>
      </div>

      <style>
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      </style>
    </section>
  `
})
export class MarqueeComponent {
  items = [
    "Dreams Kitchen & Bar Fine Dining",
    "★ 4.9 Rated Culinary Experience",
    "4 Iconic Locations in Hyderabad",
    "Courtyard Cabanas & Live Sitar",
    "Dreams Signature Dum Biryani",
    "Wood-Fired Tandoor & Charcoal",
    "24K Edible Gold Specials",
    "Dreamscape Botanical Cocktails"
  ];

  get marqueeItems(): string[] {
    return [...this.items, ...this.items, ...this.items];
  }
}
