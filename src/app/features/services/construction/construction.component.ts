import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, ElementRef, QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../../core/services/data.service';
import { ConstructionStage } from '../../../core/models';

@Component({
  selector: 'app-construction',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit, AfterViewInit, OnDestroy {
  stages: ConstructionStage[] = [];
  activeStageIndex = 0;

  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('heroTitle', { static: true }) heroTitle!: ElementRef;
  @ViewChild('heroSubtitle', { static: true }) heroSubtitle!: ElementRef;
  @ViewChild('timelineSection', { static: true }) timelineSection!: ElementRef;
  @ViewChild('timelineLine', { static: true }) timelineLine!: ElementRef;
  @ViewChild('timelineLineFill', { static: true }) timelineLineFill!: ElementRef;
  @ViewChild('ctaSection', { static: true }) ctaSection!: ElementRef;
  @ViewChildren('stageCard') stageCards!: QueryList<ElementRef>;
  @ViewChildren('stageNumber') stageNumbers!: QueryList<ElementRef>;
  @ViewChildren('timelineDot') timelineDots!: QueryList<ElementRef>;
  @ViewChildren('progressDot') progressDots!: QueryList<ElementRef>;

  private scrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.stages = this.dataService.getConstructionStages();
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Small delay to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      this.initHeroAnimations();
      this.initTimelineLineAnimation();
      this.initStageCardAnimations();
      this.initProgressIndicator();
      this.initCTAAnimation();
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initHeroAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate blueprint grid background
    tl.from('.blueprint-grid', {
      opacity: 0,
      scale: 1.3,
      duration: 2,
      ease: 'power2.out'
    })
    .from('.hero-badge', {
      y: -30,
      opacity: 0,
      duration: 0.6,
    }, 0.3)
    .from(this.heroTitle.nativeElement, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    }, 0.4)
    .from('.hero-title-accent', {
      scaleX: 0,
      duration: 0.8,
      transformOrigin: 'left center',
    }, 1.0)
    .from(this.heroSubtitle.nativeElement, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    }, 0.8)
    .from('.hero-stats .stat-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    }, 1.0);
  }

  private initTimelineLineAnimation(): void {
    // Draw the timeline line from top to bottom as user scrolls
    const st = ScrollTrigger.create({
      trigger: this.timelineSection.nativeElement,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(this.timelineLineFill.nativeElement, {
          scaleY: progress,
          transformOrigin: 'top center',
        });

        // Activate timeline dots based on progress
        const dotElements = this.timelineDots.toArray();
        const totalDots = dotElements.length;
        dotElements.forEach((dot, index) => {
          const dotThreshold = (index + 0.5) / totalDots;
          if (progress >= dotThreshold) {
            dot.nativeElement.classList.add('active');
          } else {
            dot.nativeElement.classList.remove('active');
          }
        });
      }
    });
    this.scrollTriggers.push(st);
  }

  private initStageCardAnimations(): void {
    const cards = this.stageCards.toArray();
    const numbers = this.stageNumbers.toArray();

    cards.forEach((card, index) => {
      const isLeft = index % 2 === 0;
      const xOffset = isLeft ? -150 : 150;

      // Card slide-in animation
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 82%',
        end: 'top 50%',
        onEnter: () => {
          // Main card animation
          gsap.fromTo(card.nativeElement, {
            x: xOffset,
            opacity: 0,
            scale: 0.9,
          }, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          });

          // Stage number "brick building" reveal - slides up with a bounce
          if (numbers[index]) {
            gsap.fromTo(numbers[index].nativeElement, {
              y: 40,
              opacity: 0,
              scale: 0.5,
              rotationX: 90,
            }, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 0.8,
              delay: 0.3,
              ease: 'back.out(2)',
            });
          }

          // Animate detail items stagger
          const details = card.nativeElement.querySelectorAll('.detail-item');
          gsap.fromTo(details, {
            x: isLeft ? -20 : 20,
            opacity: 0,
          }, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.5,
            ease: 'power2.out',
          });

          // Duration badge animation
          const badge = card.nativeElement.querySelector('.duration-badge');
          if (badge) {
            gsap.fromTo(badge, {
              scale: 0,
              rotation: -15,
            }, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.4,
              ease: 'elastic.out(1, 0.5)',
            });
          }
        },
        once: true,
      });
      this.scrollTriggers.push(st);
    });
  }

  private initProgressIndicator(): void {
    const cards = this.stageCards.toArray();
    const progDots = this.progressDots.toArray();

    cards.forEach((card, index) => {
      const st = ScrollTrigger.create({
        trigger: card.nativeElement,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          this.activeStageIndex = index;
          this.updateProgressDots(progDots, index);
        },
        onEnterBack: () => {
          this.activeStageIndex = index;
          this.updateProgressDots(progDots, index);
        },
      });
      this.scrollTriggers.push(st);
    });
  }

  private updateProgressDots(dots: ElementRef[], activeIndex: number): void {
    dots.forEach((dot, i) => {
      if (i <= activeIndex) {
        gsap.to(dot.nativeElement, {
          scale: i === activeIndex ? 1.4 : 1,
          backgroundColor: '#D4A017',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(dot.nativeElement, {
          scale: 1,
          backgroundColor: 'rgba(212, 160, 23, 0.2)',
          duration: 0.3,
        });
      }
    });
  }

  private initCTAAnimation(): void {
    const st = ScrollTrigger.create({
      trigger: this.ctaSection.nativeElement,
      start: 'top 85%',
      onEnter: () => {
        gsap.from(this.ctaSection.nativeElement.querySelector('.cta-inner'), {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
        });
      },
      once: true,
    });
    this.scrollTriggers.push(st);
  }
}
