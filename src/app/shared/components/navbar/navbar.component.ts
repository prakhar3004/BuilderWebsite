import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar', { static: true }) navbarEl!: ElementRef;
  isScrolled = false;
  isMobileMenuOpen = false;

  navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Services', route: '/services' },
    { label: 'Plots', route: '/plots' },
    { label: 'Homes', route: '/homes' },
    { label: 'Projects', route: '/projects' },
    { label: 'About', route: '/about' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' }
  ];

  ngOnInit(): void {
    gsap.from(this.navbarEl.nativeElement, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'transform,opacity'
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      gsap.from('.mobile-menu .nav-item', {
        x: -40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
