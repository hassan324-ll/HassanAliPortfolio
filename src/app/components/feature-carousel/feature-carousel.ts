import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-feature-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './feature-carousel.html',
  styleUrls: ['./feature-carousel.css'],
})
export class FeatureCarousel implements OnInit, OnDestroy {
  @ViewChild('owl', { static: false }) owl: any;

  activeIndex = 0;
  progressValues: number[] = [];
  progressTimer: any;
  isTransitioning = false;
  realProgressIndex = 0;

  features = [
    {
      id: '1',
      title: "Hi, I'm Hassan Ali",
      subtitle: 'Junior Angular Developer',
      bio: 'I build modern, scalable and responsive web applications.',
      // buttons: [
      //   { text: 'View Projects', action: 'projects' },
      //   { text: 'Contact Me', action: 'contact' },
      // ],
      image: './bg.jpg',
    },
    {
      id: '2',
      title: 'What I Do',
      subtitle: 'My Expertise',
      bio: 'I create responsive, fast and user-friendly web applications using modern frontend technologies.',
      // buttons: [
      //   { text: 'Learn More', action: 'learn' },
      //   { text: 'Get Started', action: 'start' },
      // ],
      image: './bg.jpg',
    },
    {
      id: '3',
      title: 'Work Philosophy',
      subtitle: 'How I Work',
      bio: 'I follow a simple and effective workflow — plan, design, build, test, and refine.',
      // buttons: [
      //   { text: 'Enable Alerts', action: 'enable' },
      //   { text: 'Configure', action: 'config' },
      // ],
      image: './bg.jpg',
    },
  ];

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    dots: false,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: false,
    smartSpeed: 800,
  };

  ngOnInit() {
    this.progressValues = this.features.map(() => 0);
    this.startProgress();
  }

  ngOnDestroy() {
    clearInterval(this.progressTimer);
  }

  onButtonClick(action: string) {
    console.log('Button action:', action);
  }

  onTranslated(event: any) {
    try {
      const itemIndex = event?.item?.index;
      const related = event?.relatedTarget;
      const clonesLength = related && Array.isArray(related._clones) ? related._clones.length : 0;

      const cloneCount = Math.floor((clonesLength || 0) / 2);
      const rawIndex = typeof itemIndex === 'number' ? itemIndex : 0;
      const realIndex =
        (((rawIndex - cloneCount) % this.features.length) + this.features.length) %
        this.features.length;

      this.activeIndex = realIndex;
      this.isTransitioning = false;

      this.progressValues = this.features.map((_, i) =>
        i === this.realProgressIndex ? this.progressValues[i] : 0
      );

      this.startProgress();
    } catch (err) {
      console.error('[FeatureCarousel:onTranslated] error handling translated event', err, event);
      this.isTransitioning = false;
      if (!this.progressValues || this.progressValues.length !== this.features.length) {
        this.progressValues = this.features.map(() => 0);
      }
      setTimeout(() => this.startProgress(), 200);
    }
  }

  private startProgress() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }

    if (this.isTransitioning) return;

    const duration = 4000;
    const interval = 30;
    const step = 100 / (duration / interval);

    this.progressTimer = setInterval(() => {
      if (this.isTransitioning) {
        clearInterval(this.progressTimer);
        return;
      }

      if (this.progressValues[this.realProgressIndex] < 100) {
        this.progressValues[this.realProgressIndex] += step;
      }

      if (this.progressValues[this.realProgressIndex] >= 100) {
        this.progressValues[this.realProgressIndex] = 100;
        clearInterval(this.progressTimer);
        this.isTransitioning = true;

        const nextIndex = (this.realProgressIndex + 1) % this.features.length;
        this.realProgressIndex = nextIndex;

        setTimeout(() => {
          if (this.owl?.next) {
            this.owl.next();
          }
        }, 200);  
      }
    }, interval);
  }
}
