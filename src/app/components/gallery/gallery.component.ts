import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  url: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gallery" style="padding: 130px 0; background: var(--cream);">
      <div class="container">
        
        <!-- HEADER -->
        <div style="text-align: center; max-width: 600px; margin: 0 auto 60px;">
          <div class="section-label" style="justify-content: center;">Atmosphere & Aesthetics</div>
          <h2
            style="font-family: var(--font-display); font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; color: var(--dark);"
          >
            The Dreams Sanctuary
          </h2>
        </div>

        <!-- GALLERY GRID -->
        <div
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;"
        >
          <div
            *ngFor="let item of galleryItems"
            (click)="activeImage = item"
            style="position: relative; height: 300px; border-radius: 4px; overflow: hidden; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.1);"
          >
            <img
              [src]="item.url"
              [alt]="item.title"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease-out);"
            />

            <!-- OVERLAY ON HOVER -->
            <div
              className="overlay"
              style="position: absolute; inset: 0; background: rgba(8, 9, 20, 0.75); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; color: var(--white);"
            >
              <div style="width: 48px; height: 48px; border: 1px solid var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); margin-bottom: 12px;">
                <span style="font-size: 20px;">🔍</span>
              </div>
              <span style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--primary);">
                {{ item.category }}
              </span>
              <h4 style="font-family: var(--font-display); font-size: 18px; margin-top: 4px;">
                {{ item.title }}
              </h4>
            </div>
          </div>
        </div>

      </div>

      <!-- FULLSCREEN LIGHTBOX MODAL -->
      <div
        *ngIf="activeImage"
        class="modal-overlay"
        (click)="activeImage = null"
        style="background: rgba(8, 9, 20, 0.96);"
      >
        <button
          (click)="activeImage = null"
          style="position: absolute; top: 24px; right: 32px; color: var(--white); background: transparent; border: none; cursor: pointer; font-size: 28px;"
        >
          ✕
        </button>

        <div
          (click)="$event.stopPropagation()"
          style="max-width: 90vw; max-height: 85vh; text-align: center;"
        >
          <img
            [src]="activeImage.url"
            [alt]="activeImage.title"
            style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 4px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);"
          />
          <div style="margin-top: 16px; color: var(--white);">
            <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--primary);">
              {{ activeImage.category }}
            </span>
            <h3 style="font-family: var(--font-display); font-size: 24px; margin-top: 4px;">
              {{ activeImage.title }}
            </h3>
          </div>
        </div>
      </div>
    </section>
  `
})
export class GalleryComponent {
  activeImage: GalleryItem | null = null;

  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Jubilee Hills Courtyard Sanctuary',
      category: 'Outdoor Courtyard',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80'
    },
    {
      id: 2,
      title: 'Royal Chandelier Dining Suite',
      category: 'Grand Interior',
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=80'
    },
    {
      id: 3,
      title: 'Dreamscape Cocktail Bar Lounge',
      category: 'Bar & Lounge',
      url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1000&q=80'
    },
    {
      id: 4,
      title: 'Skyline Terrace Rooftop Lounge',
      category: 'Rooftop Ambiance',
      url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1000&q=80'
    },
    {
      id: 5,
      title: 'Intimate Candlelit Dining Alcove',
      category: 'Private Booths',
      url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=80'
    },
    {
      id: 6,
      title: 'Live Acoustic & Sitar Lounge',
      category: 'Musical Atmosphere',
      url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1000&q=80'
    }
  ];
}
