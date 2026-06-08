import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../core/services/data.service';
import { HomeListing } from '../../core/models';

@Component({
  selector: 'app-buy-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './buy-home.component.html',
  styleUrls: ['./buy-home.component.scss']
})
export class BuyHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('filterBar') filterBar!: ElementRef;
  @ViewChildren('homeCard') homeCards!: QueryList<ElementRef>;

  allHomes: HomeListing[] = [];
  filteredHomes: HomeListing[] = [];

  bhkOptions = [2, 3, 4, 5];
  propertyTypes = ['Villa', 'Apartment', 'Row House', 'Duplex'];
  locations: string[] = [];

  selectedBHK = '';
  selectedType = '';
  selectedPriceRange = '';
  selectedLocation = '';

  priceRanges = [
    { label: 'All Prices', min: 0, max: 999999999 },
    { label: 'Under ₹50L', min: 0, max: 5000000 },
    { label: '₹50L – ₹1Cr', min: 5000000, max: 10000000 },
    { label: '₹1Cr – ₹1.5Cr', min: 10000000, max: 15000000 },
    { label: '₹1.5Cr+', min: 15000000, max: 999999999 }
  ];

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allHomes = this.dataService.getHomes();
    this.filteredHomes = [...this.allHomes];
    this.locations = [...new Set(this.allHomes.map(h => h.location))];
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 100);
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initAnimations(): void {
    // === HERO ANIMATIONS ===
    if (this.heroSection?.nativeElement) {
      const hero = this.heroSection.nativeElement;

      // Title word split animation
      gsap.from(hero.querySelector('.hero__title'), {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out'
      });

      gsap.from(hero.querySelector('.hero__subtitle'), {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
      });

      gsap.from(hero.querySelector('.hero__line'), {
        scaleX: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.inOut'
      });

      gsap.from(hero.querySelector('.hero__label'), {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });

      // Floating shapes animation
      gsap.to(hero.querySelectorAll('.hero__shape'), {
        y: -20,
        duration: 3,
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Parallax
      const st = gsap.to(hero.querySelector('.hero__bg'), {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
      if (st.scrollTrigger) this.scrollTriggers.push(st.scrollTrigger);
    }

    // === FILTER BAR ===
    if (this.filterBar?.nativeElement) {
      const filterSt = ScrollTrigger.create({
        trigger: this.filterBar.nativeElement,
        start: 'top 90%',
        onEnter: () => {
          gsap.from(this.filterBar.nativeElement, {
            y: -30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
          });
        },
        once: true
      });
      this.scrollTriggers.push(filterSt);
    }

    // === CARD STAGGER REVEAL ===
    this.animateCards();
  }

  private animateCards(): void {
    setTimeout(() => {
      const cards = this.homeCards?.toArray().map(c => c.nativeElement) || [];
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 80, rotateX: 8 });

      cards.forEach((card, i) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              delay: i * 0.15,
              ease: 'power3.out'
            });
          },
          once: true
        });
        this.scrollTriggers.push(st);
      });
    }, 200);
  }

  applyFilters(): void {
    this.filteredHomes = this.allHomes.filter(home => {
      // BHK filter
      if (this.selectedBHK && home.bhk !== +this.selectedBHK) return false;

      // Property type filter
      if (this.selectedType && home.propertyType !== this.selectedType) return false;

      // Price range
      if (this.selectedPriceRange) {
        const range = this.priceRanges.find(r => r.label === this.selectedPriceRange);
        if (range && (home.price < range.min || home.price > range.max)) return false;
      }

      // Location
      if (this.selectedLocation && home.location !== this.selectedLocation) return false;

      return true;
    });

    // Re-animate filtered cards
    setTimeout(() => {
      const cards = this.homeCards?.toArray().map(c => c.nativeElement) || [];
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        rotateX: 5,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    }, 50);
  }

  resetFilters(): void {
    this.selectedBHK = '';
    this.selectedType = '';
    this.selectedPriceRange = '';
    this.selectedLocation = '';
    this.filteredHomes = [...this.allHomes];
  }

  formatPrice(price: number): string {
    if (price >= 10000000) {
      const cr = price / 10000000;
      return '₹' + (cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)) + ' Cr';
    } else if (price >= 100000) {
      const lakh = price / 100000;
      return '₹' + (lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)) + ' Lakh';
    }
    return '₹' + price.toLocaleString('en-IN');
  }

  getAmenityIcon(amenity: string): string {
    const icons: Record<string, string> = {
      'Modular Kitchen': '🍳',
      'Garden': '🌿',
      'Parking': '🅿️',
      'CCTV': '📹',
      'Power Backup': '🔋',
      'Gym': '💪',
      'Swimming Pool': '🏊',
      'Pool': '🏊',
      'Club House': '🏛️',
      'Lift': '🛗',
      'Fire Safety': '🧯',
      'Terrace Garden': '🌺',
      'Study Room': '📚',
      'Servant Quarter': '🏠',
      'Car Porch': '🚗',
      'Home Theatre': '🎬',
      'Wine Cellar': '🍷',
      'Smart Home': '📱',
      'Landscaped Garden': '🌳',
      'Security': '🛡️',
      'Park': '🏞️',
      'Golf Course View': '⛳',
      'Private Garden': '🌹',
      '3-Car Garage': '🚙'
    };
    return icons[amenity] || '✦';
  }
}
