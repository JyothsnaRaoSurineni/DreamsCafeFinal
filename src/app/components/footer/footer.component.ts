import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer style="background: var(--black); color: var(--cream); border-top: 1px solid rgba(192, 132, 252, 0.2); padding-top: 90px; padding-bottom: 40px;">
      <div class="container">
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 50px; margin-bottom: 70px;">
          
          <!-- BRAND COLUMN -->
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 38px; height: 38px; border: 1px solid var(--primary); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); color: var(--primary); font-size: 20px; background: rgba(192, 132, 252, 0.12);">
                D
              </div>
              <span style="font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--white);">
                Dreams Kitchen
              </span>
            </div>

            <p style="font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 24px;">
              Contemporary fine dining celebrating royal heritage recipes, artisanal tandoor techniques, and high-end botanical mixology in Hyderabad.
            </p>

            <div style="display: flex; gap: 14px;">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                style="width: 36px; height: 36px; border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                title="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                style="width: 36px; height: 36px; border: 1px solid rgba(192, 132, 252, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary);"
                title="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- QUICK LINKS -->
          <div>
            <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--primary-light); margin-bottom: 20px; letter-spacing: 1px;">
              Navigation
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: rgba(255,255,255,0.7);">
              <li><a href="#menu">Signature Menu</a></li>
              <li><a href="#signatures">Chef Specials</a></li>
              <li><a href="#story">Our Heritage</a></li>
              <li><a href="#gallery">Ambiance Gallery</a></li>
              <li><a href="#locations">Locations & Timings</a></li>
            </ul>
          </div>

          <!-- HOURS & CONTACT -->
          <div>
            <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--primary-light); margin-bottom: 20px; letter-spacing: 1px;">
              Hours & Concierge
            </h4>
            <div style="font-size: 13px; color: rgba(255,255,255,0.7); display: flex; flex-direction: column; gap: 12px;">
              <div>
                <strong style="color: var(--white); display: block;">Lunch Service</strong>
                <span>12:00 PM – 03:30 PM</span>
              </div>
              <div>
                <strong style="color: var(--white); display: block;">Dinner Service</strong>
                <span>07:00 PM – 12:30 AM</span>
              </div>
              <div style="margin-top: 8px;">
                <strong style="color: var(--gold); display: block;">Table Booking Hotline:</strong>
                <span>+91 73737 34634</span>
              </div>
            </div>
          </div>

          <!-- NEWSLETTER FORM FOR PRIVATE INVITATIONS -->
          <div>
            <h4 style="font-family: var(--font-display); font-size: 16px; color: var(--primary-light); margin-bottom: 20px; letter-spacing: 1px;">
              Private Invitations
            </h4>
            <p style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 16px; line-height: 1.6;">
              Subscribe to receive exclusive tasting menu launches, private chef table invitations, and special dining offers.
            </p>

            <div *ngIf="subscribed" style="color: #4ade80; font-size: 13px; line-height: 1.5; background: rgba(74,222,128,0.1); padding: 10px 14px; border-radius: 4px; border: 1px solid rgba(74,222,128,0.3);">
              {{ subMsg }}
            </div>

            <form *ngIf="!subscribed" (ngSubmit)="handleSubscribe()" style="position: relative;">
              <input
                type="email"
                required
                placeholder="Enter your email"
                [(ngModel)]="email"
                name="email"
                class="form-input"
                style="padding-right: 46px; font-size: 12px;"
              />
              <button
                type="submit"
                title="Subscribe to Private Invitations"
                style="position: absolute; right: 6px; top: 50%; transform: translateY(-50%); background: var(--primary); color: var(--black); padding: 8px; border-radius: 2px;"
              >
                ➔
              </button>
            </form>
          </div>

        </div>

        <!-- BOTTOM BAR -->
        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: rgba(255,255,255,0.45);">
          <div>
            © {{ currentYear }} Dreams Kitchen. All Rights Reserved. Fine Dining Experience.
          </div>

          <div style="display: flex; align-items: center; gap: 20px;">
            <button
              (click)="openAdmin.emit()"
              style="color: var(--primary); display: flex; align-items: center; gap: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;"
            >
              <span>🛡️ Staff & Admin Portal (View Subscriptions)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  @Output() openAdmin = new EventEmitter<void>();

  email = '';
  subscribed = false;
  subMsg = '';
  currentYear = new Date().getFullYear();

  constructor(private apiService: ApiService) {}

  handleSubscribe(): void {
    if (!this.email || !this.email.includes('@')) return;

    this.apiService.addSubscriber(this.email).subscribe({
      next: (res) => {
        this.subscribed = true;
        this.subMsg = res.message || '✓ You are now subscribed to Dreams Kitchen VIP Private Invitations!';
        this.email = '';
        setTimeout(() => this.subscribed = false, 4000);
      },
      error: (err) => console.error(err)
    });
  }
}
