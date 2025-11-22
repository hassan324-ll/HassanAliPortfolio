import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.css'],
})
export class Testimonials {
  people = [
    {
      name: 'Robert Jonson',
      role: 'Business Owner',
      quote:
        'These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able.',
      avatar: '/profile1.jpg',
    },
    {
      name: 'Alicia Stone',
      role: 'Product Manager',
      quote:
        'Hassan turned our sketches into a beautiful product. Fast iterations and clear communication — highly recommended.',
      avatar: '/profile2.jpg',
    },
    {
      name: 'Michael Park',
      role: 'CTO',
      quote:
        'Delivered a robust frontend architecture with great performance. Very diligent and detail-oriented.',
      avatar: '/profile3.jpg',
    },
  ];

  activeIndex = 0;
  animateKey = false;

  get current() {
    return this.people[this.activeIndex] || this.people[0];
  }

  constructor() {
    // Trigger initial animation shortly after component loads
    setTimeout(() => (this.animateKey = true), 60);
  }

  select(idx: number) {
    if (idx === this.activeIndex) return;
    this.activeIndex = idx;
    // retrigger animation
    this.animateKey = false;
    setTimeout(() => (this.animateKey = true), 30);
  }
}
