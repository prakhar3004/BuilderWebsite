import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home Construction', route: '/services/construction' },
    { label: 'Buy Plots', route: '/plots' },
    { label: 'Ready Homes', route: '/homes' },
    { label: 'Renovation', route: '/services/renovation' },
    { label: 'Our Projects', route: '/projects' }
  ];

  companyLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
    { label: 'Privacy Policy', route: '/' },
    { label: 'Terms of Service', route: '/' }
  ];

  contactInfo = {
    phone: '+91 98765 43210',
    email: 'hello@buildnest.in',
    address: '42, Gomti Nagar Extension, Lucknow, UP 226010'
  };

  socialLinks = [
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '📸', label: 'Instagram', url: '#' },
    { icon: '🐦', label: 'Twitter', url: '#' },
    { icon: '▶️', label: 'YouTube', url: '#' }
  ];
}
