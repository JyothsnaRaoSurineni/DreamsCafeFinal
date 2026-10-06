import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationItem, Reservation } from '../../models/models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()" style="max-width: 680px;">
        
        <!-- MODAL HEADER -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: var(--primary); font-size: 20px;">📅</span>
            <h2 style="font-family: var(--font-display); font-size: 22px; color: var(--white);">
              Reserve a Table
            </h2>
          </div>
          <button (click)="close.emit()" style="color: rgba(255,255,255,0.5); cursor: pointer; font-size: 22px;">
            ✕
          </button>
        </div>

        <!-- BODY CONTENT -->
        <div style="padding: 32px;">
          
          <div *ngIf="confirmation" style="text-align: center; padding: 20px 0;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(74,222,128,0.15); border: 1px solid #4ade80; display: flex; align-items: center; justify-content: center; color: #4ade80; margin: 0 auto 20px; font-size: 32px;">
              ✓
            </div>

            <h3 style="font-family: var(--font-display); font-size: 26px; color: var(--white); margin-bottom: 8px;">
              Reservation Confirmed!
            </h3>
            
            <div style="font-size: 13px; color: var(--primary-light); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px;">
              Booking ID: {{ confirmation.id }}
            </div>

            <div style="background: var(--dark3); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 4px; text-align: left; display: flex; flex-direction: column; gap: 10px; font-size: 13px; margin-bottom: 24px;">
              <div><strong style="color: var(--gray-light);">Guest:</strong> {{ confirmation.guestName }} ({{ confirmation.guests }} Guests)</div>
              <div><strong style="color: var(--gray-light);">Phone:</strong> {{ confirmation.phone }}</div>
              <div><strong style="color: var(--gray-light);">Branch:</strong> {{ confirmation.locationName }}</div>
              <div><strong style="color: var(--gray-light);">Date & Time:</strong> {{ confirmation.date }} at {{ confirmation.time }}</div>
              <div><strong style="color: var(--gray-light);">Seating:</strong> {{ confirmation.seating }}</div>
            </div>

            <button (click)="closeModal()" class="btn btn-primary" style="width: 100%;">
              Done
            </button>
          </div>

          <form *ngIf="!confirmation" (ngSubmit)="handleSubmit()">
            
            <div *ngIf="errorMsg" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; padding: 12px 16px; border-radius: 4px; font-size: 13px; margin-bottom: 20px;">
              ⚠️ {{ errorMsg }}
            </div>

            <!-- LOCATION SELECTOR -->
            <div class="form-group">
              <label class="form-label">Select Destination Branch</label>
              <select class="form-select" [(ngModel)]="locId" name="locId">
                <option *ngFor="let loc of locations" [value]="loc.id">
                  {{ loc.name }} — {{ (loc.address.split(',')[1] || '').trim() || 'Hyd' }}
                </option>
              </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Guests</label>
                <select class="form-select" [(ngModel)]="guests" name="guests">
                  <option *ngFor="let n of [1,2,3,4,5,6,7,8,10,12,15,20]" [value]="n">
                    {{ n }} {{ n === 1 ? 'Guest' : 'Guests' }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Date</label>
                <input
                  type="date"
                  class="form-input"
                  required
                  [(ngModel)]="date"
                  name="date"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Time Slot</label>
                <select class="form-select" [(ngModel)]="time" name="time">
                  <option *ngFor="let t of timeSlots" [value]="t">{{ t }} PM</option>
                </select>
              </div>
            </div>

            <!-- SEATING & OCCASION -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Seating Atmosphere</label>
                <select class="form-select" [(ngModel)]="seating" name="seating">
                  <option value="Courtyard Cabana">Courtyard Cabana (Outdoor & Sitar)</option>
                  <option value="Indoor Fine Dining">Indoor Royal Fine Dining</option>
                  <option value="Rooftop Deck">Rooftop Skyline Lounge</option>
                  <option value="Private VIP Suite">Private VIP Dining Room</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Occasion</label>
                <select class="form-select" [(ngModel)]="occasion" name="occasion">
                  <option value="Casual Fine Dining">Casual Fine Dining</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Business Meeting">Business Meeting</option>
                  <option value="Family Gathering">Family Gathering</option>
                </select>
              </div>
            </div>

            <!-- GUEST CONTACT INFO -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Your Full Name</label>
                <input
                  type="text"
                  class="form-input"
                  required
                  placeholder="e.g. Vikramaditya"
                  [(ngModel)]="guestName"
                  name="guestName"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number (10 Digits)</label>
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

              <div class="form-group">
                <label class="form-label">Email (Optional)</label>
                <input
                  type="email"
                  class="form-input"
                  placeholder="vikram@example.com"
                  [(ngModel)]="email"
                  name="email"
                />
              </div>
            </div>

            <!-- SPECIAL REQUESTS -->
            <div class="form-group">
              <label class="form-label">Special Requests / Dietary Notes</label>
              <textarea
                class="form-textarea"
                placeholder="Candlelight arrangement, high-chair requirement, nut allergy, etc."
                [(ngModel)]="specialRequests"
                name="specialRequests"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="btn btn-primary"
              style="width: 100%; padding: 16px; font-size: 12px;"
            >
              <span>{{ loading ? 'Confirming Reservation...' : 'Confirm Table Booking' }}</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  `
})
export class ReservationModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() locations: LocationItem[] = [];
  @Input() selectedLocationId: string = 'loc-1';
  @Input() set selectedLocation(loc: LocationItem | null) {
    if (loc) this.locId = loc.id;
  }
  @Output() close = new EventEmitter<void>();

  locId = 'loc-1';
  guestName = '';
  email = '';
  phone = '';
  guests = 2;
  date = '2026-10-06';
  time = '20:00';
  seating = 'Courtyard Cabana';
  occasion = 'Casual Fine Dining';
  specialRequests = '';

  loading = false;
  errorMsg = '';
  confirmation: Reservation | null = null;

  timeSlots = ['12:30', '13:00', '13:30', '14:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.selectedLocationId) {
      this.locId = this.selectedLocationId;
    }
    if (!this.locations || this.locations.length === 0) {
      this.apiService.getLocations().subscribe(data => this.locations = data);
    }
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

  handleSubmit(): void {
    const cleanPhone = this.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      this.errorMsg = 'Invalid phone number! Please enter exactly 10 digits.';
      return;
    }

    this.errorMsg = '';
    this.loading = true;

    this.apiService.createReservation({
      locationId: this.locId,
      guestName: this.guestName,
      email: this.email,
      phone: cleanPhone,
      guests: Number(this.guests),
      date: this.date,
      time: this.time,
      seating: this.seating,
      occasion: this.occasion,
      specialRequests: this.specialRequests
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.confirmation = res;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.error || 'Failed to create reservation.';
      }
    });
  }

  closeModal(): void {
    this.confirmation = null;
    this.close.emit();
  }
}
