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
    { label: 'Property Deals (Plots & Land)', route: '/plots' },
    { label: 'Turnkey Construction', route: '/services/construction' },
    { label: 'Ready-to-Move Properties', route: '/homes' },
    { label: 'Home & Office Renovation', route: '/services/renovation' },
    { label: 'Our Gurugram Projects', route: '/projects' }
  ];

  companyLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Blog & Market Insights', route: '/blog' },
    { label: 'Contact Us', route: '/contact' },
    { label: 'Privacy Policy', route: '/' },
    { label: 'Terms of Service', route: '/' }
  ];

  contactInfo = {
    proprietor: 'Naveen Sharma',
    devotionalTagline: '!! Jai Guru Ji !!',
    phone1: '+91 97170 77387',
    rawPhone1: '9717077387',
    phone2: '+91 79821 00504',
    rawPhone2: '7982100504',
    email: 'info@krishnaconstruction.com',
    address: 'Office No. 420, 4th Floor, Soho Precision Tower, Sector-67, Gurugram'
  };

  partnerBrands = [
    { name: 'DLF', tag: 'Premier Partner' },
    { name: 'M3M', tag: 'Our Expertise. Your Joy.' },
    { name: 'SIGNATURE GLOBAL', tag: 'Making India Affordable' },
    { name: 'TRINITY INFRATECH', tag: 'Infra Excellence' },
    { name: 'THE AURRUM', tag: 'Boutique Realty' },
    { name: 'WHITELAND', tag: 'Prime Developer' }
  ];

  socialLinks = [
    { icon: '📘', label: 'Facebook', url: '#' },
    { icon: '📸', label: 'Instagram', url: '#' },
    { icon: '💼', label: 'LinkedIn', url: '#' },
    { icon: '💬', label: 'WhatsApp', url: 'https://wa.me/919717077387' }
  ];
}
