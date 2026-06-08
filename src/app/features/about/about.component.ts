import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  description: string;
  gradient: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('storySection') storySection!: ElementRef;
  @ViewChild('valuesSection') valuesSection!: ElementRef;
  @ViewChild('teamSection') teamSection!: ElementRef;
  @ViewChild('timelineSection') timelineSection!: ElementRef;
  @ViewChild('timelineLine') timelineLine!: ElementRef;
  @ViewChildren('valueCard') valueCards!: QueryList<ElementRef>;
  @ViewChildren('teamCard') teamCards!: QueryList<ElementRef>;
  @ViewChildren('milestoneItem') milestoneItems!: QueryList<ElementRef>;

  values: ValueCard[] = [
    {
      icon: '🏆',
      title: 'Quality',
      description: 'We use only premium materials and proven construction techniques. Every project undergoes rigorous quality inspections at every stage to ensure your home stands the test of time.'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'No hidden costs, no surprises. We provide detailed cost breakdowns, regular progress updates, and open communication throughout the entire construction process.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'From 3D design visualization to smart home integration, we embrace cutting-edge technology to deliver modern homes that are efficient, sustainable, and future-ready.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Built on a foundation of integrity, our 15+ year track record and 1200+ happy families speak for themselves. Your trust is our most valued asset.'
    }
  ];

  team: TeamMember[] = [
    {
      initials: 'VK',
      name: 'Vikram Khanna',
      role: 'Founder & CEO',
      description: 'Visionary leader with 20+ years in real estate and construction. Passionate about building communities.',
      gradient: 'linear-gradient(135deg, #D4A017, #E85D04)'
    },
    {
      initials: 'AM',
      name: 'Ananya Mehta',
      role: 'Chief Architect',
      description: 'Award-winning architect specializing in sustainable and vastu-compliant residential designs.',
      gradient: 'linear-gradient(135deg, #E85D04, #FF7B29)'
    },
    {
      initials: 'RS',
      name: 'Rajan Singh',
      role: 'Head of Engineering',
      description: 'Structural engineering expert with expertise in earthquake-resistant and green building technologies.',
      gradient: 'linear-gradient(135deg, #2ECC71, #27AE60)'
    },
    {
      initials: 'PD',
      name: 'Priya Desai',
      role: 'Interior Design Lead',
      description: 'Creative interior designer transforming spaces into luxurious, functional living experiences.',
      gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)'
    },
    {
      initials: 'AK',
      name: 'Arjun Kumar',
      role: 'Project Manager',
      description: 'Certified PMP professional ensuring every project is delivered on time, within budget, and beyond expectations.',
      gradient: 'linear-gradient(135deg, #3498DB, #2980B9)'
    },
    {
      initials: 'NK',
      name: 'Neha Kapoor',
      role: 'Head of Sales',
      description: 'Real estate consultant helping families find their perfect home with personalized guidance and support.',
      gradient: 'linear-gradient(135deg, #E74C3C, #C0392B)'
    }
  ];

  milestones: Milestone[] = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'Founded with a vision to transform the construction industry with transparency and quality.'
    },
    {
      year: '2013',
      title: '100 Homes Milestone',
      description: 'Delivered our 100th home and expanded to commercial construction projects.'
    },
    {
      year: '2016',
      title: 'Township Launch',
      description: 'Launched our first integrated township — Sunrise Township with 200+ units.'
    },
    {
      year: '2019',
      title: 'Smart Home Pioneer',
      description: 'Became the region\'s first builder to integrate IoT & smart home tech in every project.'
    },
    {
      year: '2022',
      title: 'Award-Winning Builder',
      description: 'Won "Best Residential Builder" award and crossed 500+ completed projects.'
    },
    {
      year: '2025',
      title: 'Expanding Horizons',
      description: 'Expanding to 3 new cities with a focus on sustainable, net-zero energy homes.'
    }
  ];

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initStoryAnimations();
    this.initValuesAnimations();
    this.initTeamAnimations();
    this.initTimelineAnimations();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  private initHeroAnimations(): void {
    const hero = this.heroSection.nativeElement;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(hero.querySelector('.hero__label'), {
      y: 30, opacity: 0, duration: 0.8
    })
    .from(hero.querySelector('.hero__title'), {
      y: 60, opacity: 0, duration: 1, delay: 0.1
    }, '-=0.4')
    .from(hero.querySelector('.hero__subtitle'), {
      y: 40, opacity: 0, duration: 0.8
    }, '-=0.5')
    .from(hero.querySelector('.hero__cta'), {
      y: 30, opacity: 0, duration: 0.6
    }, '-=0.3')
    .from(hero.querySelector('.hero__scroll-indicator'), {
      y: -20, opacity: 0, duration: 0.6
    }, '-=0.2');

    // Parallax on hero background
    gsap.to(hero.querySelector('.hero__bg-pattern'), {
      yPercent: 30,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  private initStoryAnimations(): void {
    const story = this.storySection.nativeElement;

    gsap.from(story.querySelector('.story__label'), {
      scrollTrigger: { trigger: story, start: 'top 80%', toggleActions: 'play none none none' },
      x: -50, opacity: 0, duration: 0.7
    });

    gsap.from(story.querySelector('.story__title'), {
      scrollTrigger: { trigger: story, start: 'top 75%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.9
    });

    gsap.from(story.querySelector('.story__text'), {
      scrollTrigger: { trigger: story.querySelector('.story__text'), start: 'top 80%', toggleActions: 'play none none none' },
      y: 60, opacity: 0, duration: 1, stagger: 0.15
    });

    gsap.from(story.querySelector('.story__image-wrapper'), {
      scrollTrigger: { trigger: story.querySelector('.story__image-wrapper'), start: 'top 80%', toggleActions: 'play none none none' },
      x: 80, opacity: 0, duration: 1.2, ease: 'power3.out'
    });

    // Stats counter animation
    const statEls = story.querySelectorAll('.story__stat-value');
    statEls.forEach((el: HTMLElement) => {
      const target = parseInt(el.getAttribute('data-value') || '0', 10);
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          el.textContent = Math.ceil(parseFloat(el.textContent || '0')) + (el.getAttribute('data-suffix') || '');
        }
      });
    });
  }

  private initValuesAnimations(): void {
    const section = this.valuesSection.nativeElement;

    gsap.from(section.querySelector('.values__title'), {
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8
    });

    this.valueCards.forEach((card, i) => {
      gsap.from(card.nativeElement, {
        scrollTrigger: { trigger: card.nativeElement, start: 'top 85%', toggleActions: 'play none none none' },
        y: 80, opacity: 0, scale: 0.9, duration: 0.8, delay: i * 0.15,
        ease: 'back.out(1.7)'
      });
    });
  }

  private initTeamAnimations(): void {
    const section = this.teamSection.nativeElement;

    gsap.from(section.querySelector('.team__title'), {
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8
    });

    this.teamCards.forEach((card, i) => {
      gsap.from(card.nativeElement, {
        scrollTrigger: { trigger: card.nativeElement, start: 'top 88%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, rotateY: 15, duration: 0.8, delay: i * 0.12,
        ease: 'power3.out'
      });
    });
  }

  private initTimelineAnimations(): void {
    const section = this.timelineSection.nativeElement;
    const line = this.timelineLine?.nativeElement;

    gsap.from(section.querySelector('.timeline__title'), {
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8
    });

    // Animate timeline line drawing
    if (line) {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: section.querySelector('.timeline__track'),
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 1
        }
      });
    }

    // Milestones pop in
    this.milestoneItems.forEach((item, i) => {
      gsap.from(item.nativeElement, {
        scrollTrigger: { trigger: item.nativeElement, start: 'top 85%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, scale: 0.8, duration: 0.7, delay: i * 0.1,
        ease: 'back.out(1.5)'
      });
    });
  }
}
