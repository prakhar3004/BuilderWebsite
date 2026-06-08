import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../core/services/data.service';
import { Plot } from '../../core/models';

interface PlotFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  facing: string;
  status: string;
}

@Component({
  selector: 'app-plots',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('filterBar') filterBar!: ElementRef;
  @ViewChild('resultsSection') resultsSection!: ElementRef;
  @ViewChildren('plotCard') plotCards!: QueryList<ElementRef>;

  allPlots: Plot[] = [];
  filteredPlots: Plot[] = [];
  locations: string[] = [];
  facingDirections: string[] = [];

  filters: PlotFilters = {
    location: '',
    priceMin: 2000000,
    priceMax: 10000000,
    priceRange: '' as any,
    areaMin: 0,
    areaMax: 999999,
    areaRange: '' as any,
    facing: '',
    status: ''
  } as any;

  priceRanges = [
    { label: 'All Prices', min: 0, max: 999999999 },
    { label: '₹20L – ₹40L', min: 2000000, max: 4000000 },
    { label: '₹40L – ₹60L', min: 4000000, max: 6000000 },
    { label: '₹60L – ₹80L', min: 6000000, max: 8000000 },
    { label: '₹80L – ₹1Cr', min: 8000000, max: 10000000 }
  ];

  areaRanges = [
    { label: 'All Areas', min: 0, max: 999999 },
    { label: '100 – 150 sq.yd', min: 100, max: 150 },
    { label: '150 – 200 sq.yd', min: 150, max: 200 },
    { label: '200 – 300 sq.yd', min: 200, max: 300 },
    { label: '300+ sq.yd', min: 300, max: 999999 }
  ];

  selectedPriceRange = '';
  selectedAreaRange = '';

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allPlots = this.dataService.getPlots();
    this.filteredPlots = [...this.allPlots];

    // Extract unique locations & facing directions
    this.locations = [...new Set(this.allPlots.map(p => p.location))];
    this.facingDirections = [...new Set(this.allPlots.map(p => p.facingDirection))];
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Small delay to let DOM render
    setTimeout(() => this.initAnimations(), 100);
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initAnimations(): void {
    // Hero parallax
    if (this.heroSection?.nativeElement) {
      const heroEl = this.heroSection.nativeElement;

      gsap.from(heroEl.querySelector('.hero__title'), {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from(heroEl.querySelector('.hero__subtitle'), {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from(heroEl.querySelector('.hero__line'), {
        scaleX: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
      });

      // Parallax on hero background
      const st = gsap.to(heroEl.querySelector('.hero__bg'), {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
      if (st.scrollTrigger) this.scrollTriggers.push(st.scrollTrigger);
    }

    // Filter bar slide down
    if (this.filterBar?.nativeElement) {
      const filterSt = ScrollTrigger.create({
        trigger: this.filterBar.nativeElement,
        start: 'top 90%',
        onEnter: () => {
          gsap.from(this.filterBar.nativeElement, {
            y: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });
      this.scrollTriggers.push(filterSt);
    }

    // Cards stagger reveal
    this.animateCards();
  }

  private animateCards(): void {
    // Wait for plotCards to be available
    setTimeout(() => {
      const cards = this.plotCards?.toArray().map(c => c.nativeElement) || [];

      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 60 });

      cards.forEach((card, i) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.1,
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
    this.filteredPlots = this.allPlots.filter(plot => {
      // Location
      if (this.filters.location && plot.location !== this.filters.location) return false;

      // Price range
      if (this.selectedPriceRange) {
        const range = this.priceRanges.find(r => r.label === this.selectedPriceRange);
        if (range && (plot.price < range.min || plot.price > range.max)) return false;
      }

      // Area range
      if (this.selectedAreaRange) {
        const range = this.areaRanges.find(r => r.label === this.selectedAreaRange);
        if (range && (plot.areaSqYd < range.min || plot.areaSqYd > range.max)) return false;
      }

      // Facing
      if (this.filters.facing && plot.facingDirection !== this.filters.facing) return false;

      // Status
      if (this.filters.status && plot.status !== this.filters.status) return false;

      return true;
    });

    // Re-animate cards after filtering
    setTimeout(() => {
      const cards = this.plotCards?.toArray().map(c => c.nativeElement) || [];
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out'
      });
    }, 50);
  }

  resetFilters(): void {
    this.filters = {
      location: '',
      priceMin: 2000000,
      priceMax: 10000000,
      areaMin: 0,
      areaMax: 999999,
      facing: '',
      status: ''
    } as any;
    this.selectedPriceRange = '';
    this.selectedAreaRange = '';
    this.filteredPlots = [...this.allPlots];
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

  formatPricePerUnit(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Available': return 'status--available';
      case 'Sold': return 'status--sold';
      case 'Reserved': return 'status--reserved';
      default: return '';
    }
  }

  getFacingIcon(direction: string): string {
    switch (direction) {
      case 'North': return '↑';
      case 'South': return '↓';
      case 'East': return '→';
      case 'West': return '←';
      default: return '◇';
    }
  }
}
