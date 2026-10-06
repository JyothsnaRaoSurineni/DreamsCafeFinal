import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationItem } from '../../models/models';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="locations" style="padding: 130px 0; background: var(--black);">
      <div class="container">
        
        <!-- HEADER -->
        <div style="text-align: center; max-width: 650px; margin: 0 auto 60px;">
          <div class="section-label" style="justify-content: center;">Hyderabad Destinations</div>
          <h2
            style="font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; color: var(--white); margin-bottom: 16px;"
          >
            Visit Our Sanctuaries
          </h2>
          <p style="font-family: var(--font-serif); font-size: 18px; color: var(--gray-light);">
            Each Dreams Kitchen location offers a distinct ambiance, from open-air courtyards to rooftop city view lounges.
          </p>
        </div>

        <!-- LOCATIONS GRID -->
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;"
        >
          <div
            *ngFor="let loc of locations"
            style="background: var(--dark2); border: 1px solid rgba(192, 132, 252, 0.2); border-radius: 4px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease;"
          >
            <!-- IMAGE -->
            <div style="position: relative; height: 220px;">
              <img
                [src]="loc.image"
                [alt]="loc.name"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(23,28,53,1) 0%, transparent 60%);"></div>
              
              <span
                style="position: absolute; top: 16px; left: 16px; background: var(--primary); color: var(--black); padding: 4px 12px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 2px;"
              >
                {{ loc.capacity }}
              </span>
            </div>

            <!-- DETAILS CONTENT -->
            <div style="padding: 24px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 20px;">
              <div>
                <h3 style="font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--white); margin-bottom: 12px;">
                  {{ loc.name }}
                </h3>

                <p style="font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 20px;">
                  {{ loc.description }}
                </p>

                <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.8);">
                  <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <span style="color: var(--primary);">📍</span>
                    <span>{{ loc.address }}</span>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--primary);">📞</span>
                    <a [href]="'tel:' + loc.phone" style="color: var(--primary-light); font-weight: 500;">
                      +91 {{ loc.phone }}
                    </a>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--primary);">🕒</span>
                    <span>{{ loc.hours }}</span>
                  </div>
                </div>

                <!-- FEATURES TAGS -->
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px;">
                  <span
                    *ngFor="let feat of loc.features"
                    style="font-size: 10px; color: var(--primary-light); background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.2); padding: 3px 8px; border-radius: 2px;"
                  >
                    ✓ {{ feat }}
                  </span>
                </div>
              </div>

              <!-- CTA -->
              <button
                (click)="selectLocationForReservation.emit(loc)"
                class="btn btn-primary"
                style="width: 100%; margin-top: 10px;"
              >
                <span>📅 Reserve at {{ loc.name.split(' ')[0] }}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class LocationsComponent {
  @Input() locations: LocationItem[] = [];
  @Output() selectLocationForReservation = new EventEmitter<LocationItem>();
}
