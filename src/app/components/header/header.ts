import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements AfterViewInit {
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.modern-nav');
      if (window.scrollY > 20) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
    });
  }

  ngAfterViewInit(): void {
    // Close mobile collapse when a nav link is clicked
    try {
      const collapse = document.getElementById('mainNavbar');
      const toggler = document.querySelector('.navbar-toggler');
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          if (!collapse) return;
          // Use Bootstrap's collapse API if available
          // @ts-ignore
          if (window.bootstrap && window.bootstrap.Collapse) {
            // @ts-ignore
            const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapse);
            bsCollapse.hide();
          } else {
            // Fallback: manually remove 'show' class and reset toggler
            if (collapse.classList.contains('show')) {
              collapse.classList.remove('show');
              (collapse as HTMLElement).style.height = '';
              if (toggler) toggler.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
    } catch (err) {
      // ignore errors in environments without DOM
    }
  }
}
