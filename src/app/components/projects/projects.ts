// ...existing code...
// Remove duplicate logic above class declaration
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
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

  isOwner = true; // Set to false for public
  showModal = false;
  modalProject: any = {
    title: '',
    description: '',
    image: '',
    tech: [],
    techString: '',
    photos: [],
    photosString: '',
    live: '',
    repo: '',
    category: 'web',
  };

  openModal() {
    this.showModal = true;
    this.modalProject = {
      title: '',
      description: '',
      image: '',
      tech: [],
      techString: '',
      photos: [],
      photosString: '',
      live: '',
      repo: '',
      category: 'web',
    };
  }

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
    this.showModal = false;
  }

  addProject() {
    // Convert techString to array
    this.modalProject.tech = (this.modalProject.techString || '')
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t);
    // Merge photos from pasted URLs with any uploaded data-URLs already present
    const pasted = (this.modalProject.photosString || '')
      .split(',')
      .map((p: string) => p.trim())
      .filter((p: string) => p);
    this.modalProject.photos = Array.isArray(this.modalProject.photos)
      ? this.modalProject.photos.concat(pasted)
      : pasted;
    // Remove techString and photosString from final object
    const { techString, photosString, ...projectData } = this.modalProject;
    this.projects.push(projectData);
    this.saveProjects();
    this.closeModal();
  }

  private saveProjects() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage', e);
    }
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
    const input = event.target as HTMLInputElement;
    if (!input || !input.files) return;
    const files = Array.from(input.files);
    const readers = files.map((file) => {
      return new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      const urls = results.filter(Boolean) as string[];
      this.modalProject.photos = Array.isArray(this.modalProject.photos)
        ? this.modalProject.photos.concat(urls)
        : urls;
      if (!this.modalProject.image && this.modalProject.photos && this.modalProject.photos.length) {
        this.modalProject.image = this.modalProject.photos[0];
      }
    });
    // Reset file input so same file can be selected again if needed
    input.value = '';
  }

  onMainImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.modalProject.image = result;
        // also ensure main image is included in photos for consistency
        this.modalProject.photos = Array.isArray(this.modalProject.photos)
          ? [result].concat(this.modalProject.photos)
          : [result];
      }
    };
    reader.onerror = () => {
      console.warn('Failed to read main image file');
    };
    reader.readAsDataURL(file);
    // clear the input to allow re-selection of the same file if needed
    input.value = '';
  }

  setFilter(f: string) {
    this.activeFilter = f;
  }

  filteredProjects() {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter((p) => p.category === this.activeFilter);
  }
}
