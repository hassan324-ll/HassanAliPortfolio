import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(CarouselModule, BrowserAnimationsModule, HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
}).catch((err) => console.error(err));
