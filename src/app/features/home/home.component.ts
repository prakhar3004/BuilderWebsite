import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DataService } from '../../core/services/data.service';
import {
  Service,
  Project,
  ConstructionStage,
  Testimonial,
  Stat
} from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private dataService = inject(DataService);
  private platformId = inject(PLATFORM_ID);

  // ── Data ──
  stats: Stat[] = [];
  services: Service[] = [];
  projects: Project[] = [];
  stages: ConstructionStage[] = [];
  testimonials: Testimonial[] = [];

  // ── Hero text cycling ──
  heroWords: string[] = ['Dream Home', 'Future', 'Legacy'];
  currentWordIndex = 0;
  currentWord = 'Dream Home';

  // ── ViewChild refs ──
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  @ViewChild('heroHeading') heroHeading!: ElementRef<HTMLElement>;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef<HTMLElement>;
  @ViewChild('heroCta') heroCta!: ElementRef<HTMLElement>;
  @ViewChild('heroWord') heroWord!: ElementRef<HTMLElement>;
  @ViewChild('gridOverlay') gridOverlay!: ElementRef<HTMLElement>;
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;
  @ViewChild('servicesSection') servicesSection!: ElementRef<HTMLElement>;
  @ViewChild('projectsSection') projectsSection!: ElementRef<HTMLElement>;
  @ViewChild('processSection') processSection!: ElementRef<HTMLElement>;
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef<HTMLElement>;
  @ViewChild('ctaSection') ctaSection!: ElementRef<HTMLElement>;

  @ViewChildren('statCard') statCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('statValue') statValues!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('stageItem') stageItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('testimonialCard') testimonialCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('floatingShape') floatingShapes!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('gridLine') gridLines!: QueryList<ElementRef<HTMLElement>>;

  private wordCycleInterval: any;
  private scrollTriggers: ScrollTrigger[] = [];
  private animations: gsap.core.Tween[] = [];

  ngOnInit(): void {
    this.stats = this.dataService.getStats();
    this.services = this.dataService.getServices();
    this.projects = this.dataService.getProjects().slice(0, 3);
    this.stages = this.dataService.getConstructionStages();
    this.testimonials = this.dataService.getTestimonials();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    // Small delay to ensure DOM is fully painted
    requestAnimationFrame(() => {
      this.initHeroAnimations();
      this.initFloatingShapes();
      this.initGridLines();
      this.initStatsAnimations();
      this.initServicesAnimations();
      this.initProjectsAnimations();
      this.initProcessAnimations();
      this.initTestimonialsAnimations();
      this.initCtaAnimations();
      this.startWordCycle();
    });
  }

  ngOnDestroy(): void {
    if (this.wordCycleInterval) {
      clearInterval(this.wordCycleInterval);
    }
    this.scrollTriggers.forEach(st => st.kill());
    this.animations.forEach(anim => anim.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  // ═══════════════════════════════════
  // HERO SECTION ANIMATIONS
  // ═══════════════════════════════════
  private initHeroAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero parallax on scroll
    const heroSt = ScrollTrigger.create({
      trigger: this.heroSection.nativeElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(this.heroSection.nativeElement.querySelector('.hero__content'), {
          y: progress * 150,
          opacity: 1 - progress * 0.6
        });
      }
    });
    this.scrollTriggers.push(heroSt);

    // Heading entrance
    tl.fromTo(
      this.heroHeading.nativeElement,
      { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2 }
    );

    // Animated word entrance
    tl.fromTo(
      this.heroWord.nativeElement,
      { y: 40, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    // Subtitle entrance
    tl.fromTo(
      this.heroSubtitle.nativeElement,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // CTA buttons entrance
    tl.fromTo(
      this.heroCta.nativeElement.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
      '-=0.4'
    );

    // Scroll indicator
    tl.fromTo(
      '.hero__scroll-indicator',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );
  }

  // ═══════════════════════════════════
  // FLOATING CONSTRUCTION SHAPES
  // ═══════════════════════════════════
  private initFloatingShapes(): void {
    if (!this.floatingShapes) return;
    this.floatingShapes.forEach((shape, i) => {
      const el = shape.nativeElement;
      const duration = 4 + Math.random() * 4;
      const delay = Math.random() * 2;

      gsap.set(el, { opacity: 0 });

      const anim = gsap.to(el, {
        opacity: 0.15 + Math.random() * 0.1,
        y: `random(-40, 40)`,
        x: `random(-20, 20)`,
        rotation: `random(-45, 45)`,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      this.animations.push(anim);
    });
  }

  // ═══════════════════════════════════
  // GRID LINES DRAWING IN
  // ═══════════════════════════════════
  private initGridLines(): void {
    if (!this.gridLines) return;
    this.gridLines.forEach((line, i) => {
      const el = line.nativeElement;
      const isVertical = el.classList.contains('grid-line--vertical');

      gsap.fromTo(
        el,
        {
          scaleX: isVertical ? 1 : 0,
          scaleY: isVertical ? 0 : 1,
          opacity: 0
        },
        {
          scaleX: 1,
          scaleY: 1,
          opacity: 0.08,
          duration: 1.5,
          delay: 0.1 * i,
          ease: 'power2.inOut'
        }
      );
    });
  }

  // ═══════════════════════════════════
  // STATS COUNTER ANIMATIONS
  // ═══════════════════════════════════
  private initStatsAnimations(): void {
    // Section header animation
    const headerSt = ScrollTrigger.create({
      trigger: this.statsSection.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          this.statsSection.nativeElement.querySelector('.section-header'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      }
    });
    this.scrollTriggers.push(headerSt);

    // Stat cards stagger reveal + counter
    const statsSt = ScrollTrigger.create({
      trigger: this.statsSection.nativeElement,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        // Cards stagger in
        gsap.fromTo(
          this.statCards.map(c => c.nativeElement),
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)'
          }
        );

        // Counter animation
        this.statValues.forEach((el, i) => {
          const target = this.stats[i].value;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2.5,
            delay: 0.15 * i,
            ease: 'power2.out',
            onUpdate: () => {
              el.nativeElement.textContent = Math.floor(counter.val).toString();
            }
          });
        });
      }
    });
    this.scrollTriggers.push(statsSt);
  }

  // ═══════════════════════════════════
  // SERVICES SECTION ANIMATIONS
  // ═══════════════════════════════════
  private initServicesAnimations(): void {
    // Section header
    const headerSt = ScrollTrigger.create({
      trigger: this.servicesSection.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const header = this.servicesSection.nativeElement.querySelector('.section-header');
        const line = this.servicesSection.nativeElement.querySelector('.section-header__line');

        gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        if (line) {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' });
        }
      }
    });
    this.scrollTriggers.push(headerSt);

    // Service cards stagger from bottom
    const cardsSt = ScrollTrigger.create({
      trigger: this.servicesSection.nativeElement,
      start: 'top 65%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          this.serviceCards.map(c => c.nativeElement),
          { y: 80, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out'
          }
        );
      }
    });
    this.scrollTriggers.push(cardsSt);
  }

  // ═══════════════════════════════════
  // FEATURED PROJECTS ANIMATIONS
  // ═══════════════════════════════════
  private initProjectsAnimations(): void {
    // Section header
    const headerSt = ScrollTrigger.create({
      trigger: this.projectsSection.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const header = this.projectsSection.nativeElement.querySelector('.section-header');
        gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    this.scrollTriggers.push(headerSt);

    // Project cards — horizontal reveal
    this.projectCards.forEach((card, i) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            card.nativeElement,
            { x: i % 2 === 0 ? -80 : 80, opacity: 0, scale: 0.95 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: i * 0.15,
              ease: 'power3.out'
            }
          );
        }
      });
      this.scrollTriggers.push(st);

      // Parallax on project images
      const imgSt = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const img = card.nativeElement.querySelector('.project-card__image');
          if (img) {
            gsap.set(img, { y: self.progress * 40 - 20 });
          }
        }
      });
      this.scrollTriggers.push(imgSt);
    });
  }

  // ═══════════════════════════════════
  // CONSTRUCTION PROCESS ANIMATIONS
  // ═══════════════════════════════════
  private initProcessAnimations(): void {
    // Section header
    const headerSt = ScrollTrigger.create({
      trigger: this.processSection.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const header = this.processSection.nativeElement.querySelector('.section-header');
        gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    this.scrollTriggers.push(headerSt);

    // Timeline line drawing
    const lineSt = ScrollTrigger.create({
      trigger: this.processSection.nativeElement,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        const line = this.processSection.nativeElement.querySelector('.process__line');
        if (line) {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' });
        }
      }
    });
    this.scrollTriggers.push(lineSt);

    // Stages — sequential brick building effect
    const stagesSt = ScrollTrigger.create({
      trigger: this.processSection.nativeElement,
      start: 'top 65%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          this.stageItems.map(s => s.nativeElement),
          {
            y: 40,
            opacity: 0,
            scale: 0.8,
            clipPath: 'inset(100% 0 0 0)'
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out'
          }
        );
      }
    });
    this.scrollTriggers.push(stagesSt);
  }

  // ═══════════════════════════════════
  // TESTIMONIALS ANIMATIONS
  // ═══════════════════════════════════
  private initTestimonialsAnimations(): void {
    // Section header
    const headerSt = ScrollTrigger.create({
      trigger: this.testimonialsSection.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const header = this.testimonialsSection.nativeElement.querySelector('.section-header');
        gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
    });
    this.scrollTriggers.push(headerSt);

    // Testimonial cards stagger
    const cardsSt = ScrollTrigger.create({
      trigger: this.testimonialsSection.nativeElement,
      start: 'top 65%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          this.testimonialCards.map(c => c.nativeElement),
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          }
        );
      }
    });
    this.scrollTriggers.push(cardsSt);
  }

  // ═══════════════════════════════════
  // CTA SECTION ANIMATIONS
  // ═══════════════════════════════════
  private initCtaAnimations(): void {
    const st = ScrollTrigger.create({
      trigger: this.ctaSection.nativeElement,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          this.ctaSection.nativeElement.querySelector('.cta__heading'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
        );

        tl.fromTo(
          this.ctaSection.nativeElement.querySelector('.cta__subtitle'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );

        tl.fromTo(
          this.ctaSection.nativeElement.querySelectorAll('.cta__buttons a'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
          '-=0.3'
        );

        // Floating construction elements in CTA
        tl.fromTo(
          this.ctaSection.nativeElement.querySelectorAll('.cta__float-element'),
          { scale: 0, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: 0.15,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.4)'
          },
          '-=0.6'
        );

        // Continuous floating animation for CTA elements
        gsap.to(this.ctaSection.nativeElement.querySelectorAll('.cta__float-element'), {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-15, 15)',
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.3, from: 'random' }
        });
      }
    });
    this.scrollTriggers.push(st);
  }

  // ═══════════════════════════════════
  // HERO WORD CYCLING
  // ═══════════════════════════════════
  private startWordCycle(): void {
    this.wordCycleInterval = setInterval(() => {
      // Animate out
      gsap.to(this.heroWord.nativeElement, {
        y: -30,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          this.currentWordIndex = (this.currentWordIndex + 1) % this.heroWords.length;
          this.currentWord = this.heroWords[this.currentWordIndex];

          // Reset position below
          gsap.set(this.heroWord.nativeElement, { y: 30, scale: 0.9 });

          // Animate in
          gsap.to(this.heroWord.nativeElement, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });
        }
      });
    }, 3000);
  }

  // ── Template helpers ──
  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Residential': '#D4A017',
      'Villa Project': '#2ECC71',
      'Commercial': '#E85D04',
      'Township': '#9B59B6',
      'Renovation': '#3498DB'
    };
    return colors[category] || '#D4A017';
  }
}
