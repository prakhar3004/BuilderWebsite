import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DataService } from '../../core/services/data.service';
import { BlogPost } from '../../core/models';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('blogGrid') blogGrid!: ElementRef;
  @ViewChildren('blogCard') blogCards!: QueryList<ElementRef>;

  allPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  activeCategory = 'All';

  categories = ['All', 'Construction', 'Buying Guide', 'Renovation', 'Design Tips', 'Investment', 'Technology'];

  categoryColors: Record<string, string> = {
    'Construction': 'linear-gradient(135deg, #D4A017, #E8B930)',
    'Buying Guide': 'linear-gradient(135deg, #2ECC71, #27AE60)',
    'Renovation': 'linear-gradient(135deg, #E85D04, #FF7B29)',
    'Design Tips': 'linear-gradient(135deg, #9B59B6, #8E44AD)',
    'Investment': 'linear-gradient(135deg, #3498DB, #2980B9)',
    'Technology': 'linear-gradient(135deg, #1ABC9C, #16A085)'
  };

  categoryBadgeColors: Record<string, string> = {
    'Construction': '#D4A017',
    'Buying Guide': '#2ECC71',
    'Renovation': '#E85D04',
    'Design Tips': '#9B59B6',
    'Investment': '#3498DB',
    'Technology': '#1ABC9C'
  };

  constructor(private dataService: DataService) {
    this.allPosts = this.dataService.getBlogPosts();
    this.filteredPosts = [...this.allPosts];
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initCardAnimations();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;

    if (category === 'All') {
      this.filteredPosts = [...this.allPosts];
    } else {
      this.filteredPosts = this.allPosts.filter(post => post.category === category);
    }

    // Animate filtered cards
    setTimeout(() => {
      this.blogCards.forEach((card, i) => {
        gsap.from(card.nativeElement, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out'
        });
      });
    }, 50);
  }

  getThumbnailGradient(category: string): string {
    return this.categoryColors[category] || 'linear-gradient(135deg, #D4A017, #E85D04)';
  }

  getBadgeColor(category: string): string {
    return this.categoryBadgeColors[category] || '#D4A017';
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Construction': '🏗️',
      'Buying Guide': '📋',
      'Renovation': '🔨',
      'Design Tips': '🎨',
      'Investment': '📈',
      'Technology': '💡'
    };
    return icons[category] || '📰';
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  private initHeroAnimations(): void {
    const hero = this.heroSection.nativeElement;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(hero.querySelector('.hero__label'), {
      y: 30, opacity: 0, duration: 0.8
    })
    .from(hero.querySelector('.hero__title'), {
      y: 60, opacity: 0, duration: 1
    }, '-=0.4')
    .from(hero.querySelector('.hero__subtitle'), {
      y: 40, opacity: 0, duration: 0.8
    }, '-=0.5')
    .from(hero.querySelector('.hero__categories'), {
      y: 30, opacity: 0, duration: 0.6
    }, '-=0.3');

    // Parallax
    gsap.to(hero.querySelector('.hero__bg-pattern'), {
      yPercent: 25,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  private initCardAnimations(): void {
    this.blogCards.forEach((card, i) => {
      gsap.from(card.nativeElement, {
        scrollTrigger: { trigger: card.nativeElement, start: 'top 88%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, scale: 0.95, duration: 0.7, delay: i * 0.1,
        ease: 'power3.out'
      });
    });
  }
}
