import { Component } from '@angular/core';
import { FeatureCarousel } from '../feature-carousel/feature-carousel';

@Component({
  selector: 'app-home',
  imports: [FeatureCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
