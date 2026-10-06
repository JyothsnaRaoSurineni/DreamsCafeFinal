import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review, LocationItem } from '../../models/models';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="reviews" style="padding: 130px 0; background: var(--dark);">
      <div class="container">
        
        <!-- HEADER -->
        <div style="text-align: center; max-width: 650px; margin: 0 auto 60px;">
          <div class="section-label" style="justify-content: center;">Guest Experiences</div>
          <h2
            style="font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; color: var(--white); margin-bottom: 16px;"
          >
            Words From Our Patrons
          </h2>

          <!-- OVERALL RATING SCORE BOX -->
          <div
            style="display: inline-flex; align-items: center; gap: 16px; background: rgba(192, 132, 252, 0.08); border: 1px solid rgba(192, 132, 252, 0.25); padding: 12px 28px; border-radius: 4px; margin-top: 12px;"
          >
            <span style="font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--gold);">
              4.9
            </span>
            <div style="text-align: left;">
              <div style="color: var(--gold); font-size: 13px; letter-spacing: 2px;">★★★★★</div>
              <div style="font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.6);">
                Based on 1,200+ Reviews
              </div>
            </div>
          </div>
        </div>

        <!-- WRITE A REVIEW TRIGGER BUTTON -->
        <div style="text-align: center; margin-bottom: 40px;">
          <button
            (click)="showForm = !showForm"
            class="btn btn-gold-outline"
            style="padding: 10px 24px; font-size: 11px;"
          >
            <span>✍️ {{ showForm ? 'Close Review Form' : 'Share Your Dining Experience' }}</span>
          </button>
        </div>

        <!-- REVIEW FORM IF OPEN -->
        <div
          *ngIf="showForm"
          style="max-width: 600px; margin: 0 auto 50px; background: var(--dark2); border: 1px solid rgba(192, 132, 252, 0.3); padding: 32px; border-radius: 4px;"
        >
          <h3 style="font-family: var(--font-display); font-size: 20px; color: var(--white); margin-bottom: 20px;">
            Write a Verified Review
          </h3>

          <div *ngIf="submitted" style="text-align: center; color: #4ade80; padding: 20px 0;">
            <span style="font-size: 36px;">✓</span>
            <p style="font-size: 15px; margin-top: 10px;">Thank you! Your review has been published.</p>
          </div>

          <form *ngIf="!submitted" (ngSubmit)="handleSubmit()">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Your Full Name</label>
                <input
                  type="text"
                  class="form-input"
                  required
                  placeholder="e.g. Ananya Sharma"
                  [(ngModel)]="author"
                  name="author"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Branch Visited</label>
                <select
                  class="form-select"
                  [(ngModel)]="location"
                  name="location"
                >
                  <option *ngFor="let loc of locations" [value]="loc.name">{{ loc.name }}</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Rating (1 to 5 Stars)</label>
              <div style="display: flex; gap: 8px;">
                <button
                  *ngFor="let star of [1, 2, 3, 4, 5]"
                  type="button"
                  (click)="rating = star"
                  [style.color]="star <= rating ? 'var(--gold)' : 'rgba(255,255,255,0.2)'"
                  style="background: transparent; font-size: 24px; cursor: pointer;"
                >
                  ★
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Your Comments & Highlights</label>
              <textarea
                class="form-textarea"
                required
                placeholder="Tell us about the dishes, service, or ambiance..."
                [(ngModel)]="comment"
                name="comment"
              ></textarea>
            </div>

            <button
              type="submit"
              [disabled]="loading"
              class="btn btn-primary"
              style="width: 100%;"
            >
              <span>{{ loading ? 'Publishing...' : 'Submit Review' }}</span>
            </button>
          </form>
        </div>

        <!-- REVIEWS CARDS GRID -->
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;"
        >
          <div
            *ngFor="let rev of reviews"
            style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 32px 28px; border-radius: 4px; display: flex; flex-direction: column; justify-content: space-between; gap: 20px;"
          >
            <div>
              <!-- RATING STARS & LOCATION -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div style="color: var(--gold); font-size: 14px; letter-spacing: 2px;">
                  {{ getStars(rev.rating) }}
                </div>
                <span style="font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4);">
                  {{ rev.date || 'Recent' }}
                </span>
              </div>

              <!-- COMMENT QUOTE -->
              <p style="font-family: var(--font-serif); font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); font-style: italic;">
                "{{ rev.comment }}"
              </p>
            </div>

            <!-- AUTHOR INFO -->
            <div style="display: flex; align-items: center; gap: 12px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
              <img
                [src]="rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'"
                [alt]="rev.author"
                style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary);"
              />
              <div>
                <h4 style="font-size: 14px; font-weight: 600; color: var(--white);">
                  {{ rev.author }}
                </h4>
                <span style="font-size: 10px; color: var(--primary-light); text-transform: uppercase; letter-spacing: 1px;">
                  {{ rev.location || 'Hyderabad' }}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class ReviewsComponent {
  @Input() reviews: Review[] = [];
  @Input() locations: LocationItem[] = [];
  @Output() addReview = new EventEmitter<any>();

  showForm = false;
  author = '';
  rating = 5;
  location = 'Jubilee Hills Flagship';
  comment = '';
  submitted = false;
  loading = false;

  getStars(count: number): string {
    return '★'.repeat(count || 5);
  }

  handleSubmit(): void {
    if (!this.author || !this.comment) return;
    this.loading = true;

    this.addReview.emit({
      author: this.author,
      rating: Number(this.rating),
      location: this.location,
      comment: this.comment
    });

    this.submitted = true;
    this.author = '';
    this.comment = '';
    this.loading = false;
    setTimeout(() => {
      this.submitted = false;
      this.showForm = false;
    }, 2000);
  }
}
