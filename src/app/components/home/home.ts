import { Component } from '@angular/core';
import { FeatureCarousel } from '../feature-carousel/feature-carousel';
import { Testimonials } from '../testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [FeatureCarousel, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
