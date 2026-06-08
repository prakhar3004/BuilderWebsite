import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../core/services/data.service';
import { Project } from '../../core/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('categoryTabs') categoryTabs!: ElementRef;
  @ViewChild('statsSection') statsSection!: ElementRef;
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  @ViewChildren('statItem') statItems!: QueryList<ElementRef>;

  allProjects: Project[] = [];
  filteredProjects: Project[] = [];

  categories = ['All', 'Residential', 'Commercial', 'Villa Project', 'Township', 'Renovation'];
  activeCategory = 'All';

  totalProjects = 0;
  totalAreaBuilt = 0;
  yearsOfExcellence = 15;

  // Counter animation targets
  displayProjects = 0;
  displayArea = 0;
  displayYears = 0;

  private scrollTriggers: ScrollTrigger[] = [];
  private cardScrollTriggers: ScrollTrigger[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allProjects = this.dataService.getProjects();
    this.filteredProjects = [...this.allProjects];

    // Calculate stats
    this.totalProjects = this.allProjects.length;
    this.totalAreaBuilt = this.allProjects.reduce((sum, p) => sum + p.areaSqFt, 0);
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => this.initAnimations(), 100);
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach(st => st.kill());
    this.cardScrollTriggers.forEach(st => st.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  private initAnimations(): void {
    // === HERO ANIMATIONS ===
    if (this.heroSection?.nativeElement) {
      const hero = this.heroSection.nativeElement;

      // Title reveal with split effect
      gsap.from(hero.querySelector('.hero__title'), {
        y: 120,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      gsap.from(hero.querySelector('.hero__subtitle'), {
        y: 60,
        opacity: 0,
        duration: 1.1,
        delay: 0.35,
        ease: 'power3.out'
      });

      gsap.from(hero.querySelector('.hero__line'), {
        scaleX: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'expo.out'
      });

      gsap.from(hero.querySelector('.hero__label'), {
        y: -40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power2.out'
      });

      // Parallax on hero bg
      const st = gsap.to(hero.querySelector('.hero__bg'), {
        y: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      });
      if (st.scrollTrigger) this.scrollTriggers.push(st.scrollTrigger);
    }

    // === CATEGORY TABS ===
    if (this.categoryTabs?.nativeElement) {
      const tabs = this.categoryTabs.nativeElement.querySelectorAll('.category-tab');
      gsap.from(tabs, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
    }

    // === PROJECT CARDS - Alternating slide ===
    this.animateProjectCards();

    // === STATS COUNTER ANIMATION ===
    if (this.statsSection?.nativeElement) {
      const statsSt = ScrollTrigger.create({
        trigger: this.statsSection.nativeElement,
        start: 'top 80%',
        onEnter: () => {
          this.animateCounters();
          // Animate stat items
          const items = this.statItems?.toArray().map(s => s.nativeElement) || [];
          gsap.from(items, {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });
      this.scrollTriggers.push(statsSt);
    }
  }

  private animateProjectCards(): void {
    // Kill existing card scroll triggers and tweens
    this.cardScrollTriggers.forEach(st => st.kill());
    this.cardScrollTriggers = [];

    setTimeout(() => {
      const cards = this.projectCards?.toArray().map(c => c.nativeElement) || [];
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0 });

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(card, {
          x: fromLeft ? -120 : 120,
          opacity: 0,
          rotateY: fromLeft ? 5 : -5
        });

        const st = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: 'power3.out'
            });

            // Parallax on project image
            const imgEl = card.querySelector('.project-card__image');
            if (imgEl) {
              const imgSt = gsap.to(imgEl.querySelector('.project-card__image-inner'), {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1
                }
              });
              if (imgSt.scrollTrigger) this.cardScrollTriggers.push(imgSt.scrollTrigger);
            }
          },
          once: true
        });
        this.cardScrollTriggers.push(st);
      });
    }, 200);
  }

  private animateCounters(): void {
    // Projects counter
    const projObj = { val: 0 };
    gsap.to(projObj, {
      val: this.totalProjects,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        this.displayProjects = Math.round(projObj.val);
      }
    });

    // Area counter (in lakhs sq.ft)
    const areaObj = { val: 0 };
    gsap.to(areaObj, {
      val: this.totalAreaBuilt,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        this.displayArea = Math.round(areaObj.val);
      }
    });

    // Years counter
    const yearsObj = { val: 0 };
    gsap.to(yearsObj, {
      val: this.yearsOfExcellence,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        this.displayYears = Math.round(yearsObj.val);
      }
    });
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;

    if (category === 'All') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.category === category);
    }

    // Re-run the project card animation setup (which handles ScrollTrigger recreation)
    this.animateProjectCards();
  }

  formatArea(sqft: number): string {
    if (sqft >= 100000) {
      const lakh = sqft / 100000;
      return (lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)) + 'L';
    }
    return sqft.toLocaleString('en-IN');
  }

  formatAreaFull(sqft: number): string {
    return sqft.toLocaleString('en-IN') + ' sq.ft';
  }
}
