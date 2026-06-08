import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../../core/services/data.service';
import { Service } from '../../../core/models';

@Component({
  selector: 'app-services-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services-overview.component.html',
  styleUrls: ['./services-overview.component.scss']
})
export class ServicesOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
  services: Service[] = [];

  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef;
  @ViewChild('heroLine', { static: true }) heroLine!: ElementRef;
  @ViewChild('cardsSection', { static: true }) cardsSection!: ElementRef;
  @ViewChild('ctaSection', { static: true }) ctaSection!: ElementRef;
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.services = this.dataService.getServices();
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initCardAnimations();
    this.initCTAAnimation();
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initHeroAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(this.heroLine.nativeElement, {
      scaleX: 0,
      duration: 0.8,
      transformOrigin: 'center'
    })
    .from(this.heroTitle.nativeElement, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.3')
    .from(this.heroSubtitle.nativeElement, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from('.hero-bg-pattern', {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, 0);
  }

  private initCardAnimations(): void {
    const cards = this.serviceCards.toArray();
    const directions = [
      { x: -120, y: 60, rotation: -5 },   // top-left: from left
      { x: 120, y: 60, rotation: 5 },     // top-right: from right
      { x: -120, y: 60, rotation: -5 },   // bottom-left: from left
      { x: 120, y: 60, rotation: 5 },     // bottom-right: from right
    ];

    cards.forEach((card, index) => {
      const dir = directions[index % directions.length];
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 85%',
        end: 'top 50%',
        onEnter: () => {
          gsap.fromTo(card.nativeElement, {
            x: dir.x,
            y: dir.y,
            opacity: 0,
            rotation: dir.rotation,
            scale: 0.85,
          }, {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        },
        once: true,
      });
      this.scrollTriggers.push(st);

      // Animate feature list items inside each card
      const featureItems = card.nativeElement.querySelectorAll('.feature-item');
      const st2 = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(featureItems, {
            x: -20,
            opacity: 0,
          }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5 + index * 0.15,
            ease: 'power2.out',
          });
        },
        once: true,
      });
      this.scrollTriggers.push(st2);
    });

    // Section heading animation
    const sectionHeading = this.cardsSection.nativeElement.querySelector('.section-header');
    if (sectionHeading) {
      const st = ScrollTrigger.create({
        trigger: sectionHeading,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(sectionHeading, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    }
  }

  private initCTAAnimation(): void {
    const st = ScrollTrigger.create({
      trigger: this.ctaSection.nativeElement,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(this.ctaSection.nativeElement, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        });
        gsap.from(this.ctaSection.nativeElement.querySelectorAll('.cta-glow'), {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.3,
        });
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }
}
