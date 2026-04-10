import { Routes } from '@angular/router';
import { FeatureCarousel } from './components/feature-carousel/feature-carousel';
import { AboutMe } from './components/about-me/about-me';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },

  {
    path: 'carousel-component',
    component: FeatureCarousel,
  },
  {
    path: 'about-me',
    component: AboutMe,
  },
  {
    path: 'projects',
    component: Projects,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'Home',
    component: Home,
  },
  {
    path: 'Footer',
    component: Footer,
  },
  {
    path: 'Header',
    component: Header,
  },
];
