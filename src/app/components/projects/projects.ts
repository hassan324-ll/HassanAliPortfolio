// ...existing code...
// Remove duplicate logic above class declaration
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements OnInit {
  zoomLevel = 1;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  imgOffsetX = 0;
  imgOffsetY = 0;
  showPhotoModal = false;
  activePhotoList: string[] = [];
  activePhotoIndex = 0;
  activePhotoUrl = '';
  activeFilter: string = 'all';

  projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio built with Angular showcasing projects and blog posts.',
      image: '/sliderimage.avif',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      live: '#',
      repo: '#',
      category: 'web',
      photos: ['/sliderimage.avif', '/sliderimage.avif'],
    },
    {
      title: 'Design System UI Kit',
      description: 'Reusable UI components, tokens, and documentation for consistent interfaces.',
      image: '/sliderimage.avif',
      tech: ['HTML', 'CSS', 'SCSS'],
      live: '#',
      repo: '#',
      category: 'ui',
      photos: ['/sliderimage.avif'],
    },
    {
      title: 'API Integration Demo',
      description: 'Example app integrating third-party REST APIs with caching and error handling.',
      image: '/sliderimage.avif',
      tech: ['Angular', 'RxJS', 'REST'],
      live: '#',
      repo: '#',
      category: 'api',
      photos: null,
    },
  ];

  private storageKey = 'hassan_portfolio_projects_v1';

  ngOnInit() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          this.projects = parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage', e);
    }
  }

  closeModal() {
    // modal removed
  }

  showPhotos(p: any) {
    if (!p || !Array.isArray(p.photos) || !p.photos.length) return;
    this.activePhotoList = p.photos;
    this.activePhotoIndex = 0;
    this.activePhotoUrl = p.photos[0];
    this.showPhotoModal = true;
    this.zoomLevel = 1;
    this.imgOffsetX = 0;
    this.imgOffsetY = 0;
  }

  closePhotoModal() {
    this.showPhotoModal = false;
    this.activePhotoList = [];
    this.activePhotoIndex = 0;
    this.activePhotoUrl = '';
    this.zoomLevel = 1;
    this.imgOffsetX = 0;
    this.imgOffsetY = 0;
  }

  zoomIn() {
    if (this.zoomLevel < 3) this.zoomLevel += 0.2;
  }

  zoomOut() {
    if (this.zoomLevel > 1) this.zoomLevel -= 0.2;
    if (this.zoomLevel < 1) this.zoomLevel = 1;
  }

  startDrag(event: MouseEvent) {
    if (this.zoomLevel <= 1) return;
    this.isDragging = true;
    this.dragStartX = event.clientX - this.imgOffsetX;
    this.dragStartY = event.clientY - this.imgOffsetY;
    event.preventDefault();
  }

  endDrag() {
    this.isDragging = false;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    this.imgOffsetX = event.clientX - this.dragStartX;
    this.imgOffsetY = event.clientY - this.dragStartY;
    const img = document.querySelector('.photo-modal-img') as HTMLElement;
    if (img) {
      img.style.transform = `scale(${this.zoomLevel}) translate(${
        this.imgOffsetX / this.zoomLevel
      }px, ${this.imgOffsetY / this.zoomLevel}px)`;
    }
  }

  prevPhoto() {
    if (!this.activePhotoList.length) return;
    this.activePhotoIndex =
      (this.activePhotoIndex - 1 + this.activePhotoList.length) % this.activePhotoList.length;
    this.activePhotoUrl = this.activePhotoList[this.activePhotoIndex];
  }

  nextPhoto() {
    if (!this.activePhotoList.length) return;
    this.activePhotoIndex = (this.activePhotoIndex + 1) % this.activePhotoList.length;
    this.activePhotoUrl = this.activePhotoList[this.activePhotoIndex];
  }

  onFilesSelected(event: Event) {
    // removed: upload handled via owner-only modal
  }

  setFilter(f: string) {
    this.activeFilter = f;
  }

  filteredProjects() {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter((p) => p.category === this.activeFilter);
  }
}
