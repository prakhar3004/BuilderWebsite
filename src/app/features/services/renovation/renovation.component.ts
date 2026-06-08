import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, ElementRef, QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../../core/services/data.service';

interface RenovationType {
  icon: string;
  title: string;
  description: string;
  priceRange: string;
  features: string[];
}

interface RenovationStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface BeforeAfter {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-renovation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './renovation.component.html',
  styleUrls: ['./renovation.component.scss']
})
export class RenovationComponent implements OnInit, AfterViewInit, OnDestroy {

  renovationTypes: RenovationType[] = [
    {
      icon: '🍳',
      title: 'Kitchen Renovation',
      description: 'Transform your kitchen with modular designs, premium countertops, and smart storage solutions.',
      priceRange: 'Starting from ₹3 Lakh',
      features: ['Modular Kitchen', 'Granite Countertops', 'Smart Storage', 'Chimney & Hob']
    },
    {
      icon: '🚿',
      title: 'Bathroom Renovation',
      description: 'Luxury bathroom makeovers with premium fittings, modern tiles, and spa-like aesthetics.',
      priceRange: 'Starting from ₹2 Lakh',
      features: ['Premium Fittings', 'Anti-skid Tiles', 'Rain Shower', 'Vanity Units']
    },
    {
      icon: '🛋️',
      title: 'Living Room Makeover',
      description: 'Create stunning living spaces with designer walls, ambient lighting, and false ceiling designs.',
      priceRange: 'Starting from ₹4 Lakh',
      features: ['False Ceiling', 'Designer Walls', 'Ambient Lighting', 'Custom Furniture']
    },
    {
      icon: '🏡',
      title: 'Exterior Renovation',
      description: 'Revamp your home exterior with modern elevation, landscaping, and weather-resistant finishes.',
      priceRange: 'Starting from ₹5 Lakh',
      features: ['Modern Elevation', 'Landscaping', 'Driveway', 'Boundary Wall']
    }
  ];

  processSteps: RenovationStep[] = [
    {
      number: '01',
      icon: '📋',
      title: 'Consultation',
      description: 'We visit your space, understand your vision, and create a detailed renovation plan with budget.'
    },
    {
      number: '02',
      icon: '✏️',
      title: 'Design & Plan',
      description: 'Our designers create 3D renders and material selections for your approval before work begins.'
    },
    {
      number: '03',
      icon: '🔨',
      title: 'Execute',
      description: 'Our expert team transforms your space with precision, quality materials, and minimal disruption.'
    },
    {
      number: '04',
      icon: '✨',
      title: 'Handover',
      description: 'Final quality check, deep cleaning, and handover of your beautifully transformed space.'
    }
  ];

  beforeAfterItems: BeforeAfter[] = [
    {
      title: 'Kitchen Transformation',
      beforeLabel: 'Old Cramped Kitchen',
      afterLabel: 'Modern Modular Kitchen',
      description: 'Complete kitchen overhaul with Italian modular design and quartz countertops.',
      icon: '🍳'
    },
    {
      title: 'Bathroom Upgrade',
      beforeLabel: 'Dated Bathroom',
      afterLabel: 'Spa-Inspired Bathroom',
      description: 'Luxury makeover with rain shower, designer tiles, and premium fittings.',
      icon: '🚿'
    }
  ];

  projectsCompleted = 0;
  happyClients = 0;
  yearsExperience = 0;

  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef;
  @ViewChild('typesSection', { static: true }) typesSection!: ElementRef;
  @ViewChild('showcaseSection', { static: true }) showcaseSection!: ElementRef;
  @ViewChild('processSection', { static: true }) processSection!: ElementRef;
  @ViewChild('ctaSection', { static: true }) ctaSection!: ElementRef;
  @ViewChild('statsSection', { static: true }) statsSection!: ElementRef;
  @ViewChildren('typeCard') typeCards!: QueryList<ElementRef>;
  @ViewChildren('processCard') processCards!: QueryList<ElementRef>;
  @ViewChildren('showcaseCard') showcaseCards!: QueryList<ElementRef>;

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    requestAnimationFrame(() => {
      this.initHeroAnimations();
      this.initTypeCardAnimations();
      this.initShowcaseAnimations();
      this.initProcessAnimations();
      this.initCounterAnimation();
      this.initCTAAnimation();
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initHeroAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-parallax-bg', {
      scale: 1.3,
      opacity: 0,
      duration: 2,
      ease: 'power2.out'
    })
    .from('.hero-label', {
      y: -20,
      opacity: 0,
      duration: 0.6,
    }, 0.3)
    .from(this.heroTitle.nativeElement, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    }, 0.4)
    .from(this.heroSubtitle.nativeElement, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, 0.8)
    .from('.hero-cta-btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, 1.0);

    // Parallax on scroll
    const st = ScrollTrigger.create({
      trigger: this.heroSection.nativeElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set('.hero-parallax-bg', {
          y: self.progress * 100,
        });
        gsap.set('.hero-content', {
          y: self.progress * -50,
          opacity: 1 - self.progress * 0.8,
        });
      }
    });
    this.scrollTriggers.push(st);
  }

  private initTypeCardAnimations(): void {
    const cards = this.typeCards.toArray();

    // Section header
    const headerEl = this.typesSection.nativeElement.querySelector('.section-header');
    if (headerEl) {
      const st = ScrollTrigger.create({
        trigger: headerEl,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(headerEl, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    }

    cards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card.nativeElement, {
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotationY: 15,
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.9,
            delay: index * 0.12,
            ease: 'power3.out',
          });

          // Animate price badge
          const priceBadge = card.nativeElement.querySelector('.price-badge');
          if (priceBadge) {
            gsap.fromTo(priceBadge, {
              scale: 0,
              rotation: -10,
            }, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.4 + index * 0.12,
              ease: 'elastic.out(1, 0.5)',
            });
          }

          // Feature items
          const features = card.nativeElement.querySelectorAll('.feature-tag');
          gsap.fromTo(features, {
            y: 10,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.5 + index * 0.12,
            ease: 'power2.out',
          });
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    });
  }

  private initShowcaseAnimations(): void {
    const cards = this.showcaseCards.toArray();

    cards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card.nativeElement, {
            y: 60,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
          });

          // Animate the slider bar
          const slider = card.nativeElement.querySelector('.slider-handle');
          if (slider) {
            gsap.fromTo(slider, {
              left: '10%',
            }, {
              left: '50%',
              duration: 1.5,
              delay: 0.5 + index * 0.2,
              ease: 'power2.inOut',
            });
          }
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    });
  }

  private initProcessAnimations(): void {
    const cards = this.processCards.toArray();
    const connector = this.processSection.nativeElement.querySelectorAll('.process-connector');

    cards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(card.nativeElement, {
            y: 50,
            opacity: 0,
            scale: 0.9,
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power3.out',
          });

          // Animate icon bounce
          const icon = card.nativeElement.querySelector('.process-icon');
          if (icon) {
            gsap.fromTo(icon, {
              scale: 0,
              rotation: -30,
            }, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.3 + index * 0.15,
              ease: 'back.out(2)',
            });
          }
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    });

    // Animate connectors
    if (connector.length) {
      const st = ScrollTrigger.create({
        trigger: this.processSection.nativeElement,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(connector, {
            scaleX: 0,
          }, {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power2.out',
            transformOrigin: 'left center',
          });
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    }
  }

  private initCounterAnimation(): void {
    const st = ScrollTrigger.create({
      trigger: this.statsSection.nativeElement,
      start: 'top 80%',
      onEnter: () => {
        this.animateCounter('projectsCompleted', 250, 2);
        this.animateCounter('happyClients', 200, 2);
        this.animateCounter('yearsExperience', 15, 1.5);

        gsap.from(this.statsSection.nativeElement.querySelectorAll('.stat-card'), {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }

  private animateCounter(property: 'projectsCompleted' | 'happyClients' | 'yearsExperience', target: number, duration: number): void {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        this[property] = Math.round(obj.value);
      }
    });
  }

  private initCTAAnimation(): void {
    const st = ScrollTrigger.create({
      trigger: this.ctaSection.nativeElement,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(this.ctaSection.nativeElement.querySelector('.cta-inner'), {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        });
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }
}
