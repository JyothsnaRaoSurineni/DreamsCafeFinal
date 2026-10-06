import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="story" style="padding: 130px 0; background: var(--cream); color: var(--dark);">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center;" className="story-grid">
          
          <!-- LEFT: COMPOSITE IMAGE GALLERY -->
          <div style="position: relative; min-height: 440px;">
            <!-- Main large image -->
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
              alt="Dreams Kitchen Atmosphere"
              style="width: 80%; height: 420px; object-fit: cover; border-radius: 4px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);"
            />
            <!-- Accent floating image -->
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
              alt="Chef crafting dish at Dreams Kitchen"
              style="position: absolute; bottom: -30px; right: 0; width: 55%; height: 260px; object-fit: cover; border: 6px solid var(--cream); border-radius: 4px; box-shadow: 0 15px 30px rgba(0,0,0,0.2);"
            />
            <!-- Badge -->
            <div
              style="position: absolute; top: 40px; left: -20px; background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: var(--white); padding: 20px 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border-radius: 4px;"
            >
              <div style="font-family: var(--font-display); font-size: 38px; font-weight: 700; line-height: 1;">
                4.9★
              </div>
              <div style="font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px;">
                Michelin Grade Craft
              </div>
            </div>
          </div>

          <!-- RIGHT: STORY CONTENT -->
          <div>
            <div class="section-label">Heritage & Craftsmanship</div>
            <h2
              style="font-family: var(--font-display); font-size: clamp(32px, 3.8vw, 50px); font-weight: 500; line-height: 1.15; color: var(--dark); margin-bottom: 24px;"
            >
              Where Royal Heritage Meets <em style="font-style: italic; color: var(--primary-dark);">Culinary Dreams.</em>
            </h2>

            <p style="font-size: 15px; line-height: 1.8; color: #4a4a4a; margin-bottom: 20px;">
              Dreams Kitchen & Bar was born out of a passion to honor Hyderabad's opulent culinary legacy while creating an enchanting, elevated dining experience for every guest.
            </p>

            <p style="font-size: 15px; line-height: 1.8; color: #4a4a4a; margin-bottom: 32px;">
              Every broth is simmered for up to 18 hours in copper Handis over white wood ash. From our 24K gold-leaf infused Zafrani Paneer to our Dreamscape Mutton Biryani, every dish is crafted fresh to order with precision.
            </p>

            <div style="width: 60px; height: 3px; background: linear-gradient(to right, var(--primary), var(--gold)); margin-bottom: 36px;"></div>

            <!-- KEY STATS GRID -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
              <div>
                <div style="font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--primary-dark);">
                  4+
                </div>
                <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #777; margin-top: 4px;">
                  Iconic Locations
                </div>
              </div>

              <div>
                <div style="font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--primary-dark);">
                  120+
                </div>
                <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #777; margin-top: 4px;">
                  Signature Dishes
                </div>
              </div>

              <div>
                <div style="font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--primary-dark);">
                  50k+
                </div>
                <div style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: #777; margin-top: 4px;">
                  Happy Guests
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>
        @media (min-width: 900px) {
          .story-grid { grid-template-columns: 1fr 1fr !important; gap: 80px !important; }
        }
      </style>
    </section>
  `
})
export class StoryComponent {}
