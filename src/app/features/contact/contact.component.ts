import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  subValue?: string;
}

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('faqSection') faqSection!: ElementRef;
  @ViewChildren('formField') formFields!: QueryList<ElementRef>;
  @ViewChildren('contactCard') contactCards!: QueryList<ElementRef>;
  @ViewChildren('faqItem') faqItems!: QueryList<ElementRef>;

  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  contactInfo: ContactInfo[] = [
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 98765 43210',
      subValue: '+91 87654 32109'
    },
    {
      icon: '✉️',
      title: 'Email',
      value: 'info@buildnest.com',
      subValue: 'sales@buildnest.com'
    },
    {
      icon: '📍',
      title: 'Office Address',
      value: '42, Vikram Tower, Gomti Nagar',
      subValue: 'Lucknow, UP 226010'
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      value: 'Mon — Sat: 9:00 AM — 7:00 PM',
      subValue: 'Sunday: By Appointment'
    }
  ];

  faqs: FaqItem[] = [
    {
      question: 'How long does it take to build a house from scratch?',
      answer: 'A typical residential home construction takes 8-12 months depending on the size, design complexity, and weather conditions. We provide a detailed project timeline during the consultation phase, and our dedicated project manager keeps you updated at every stage.',
      isOpen: false
    },
    {
      question: 'What is included in your construction cost estimate?',
      answer: 'Our cost estimate includes everything from foundation to finishing — materials, labor, design, government approvals, electrical, plumbing, painting, and basic fixtures. We provide a transparent, itemized breakdown so you know exactly where every rupee goes. No hidden costs, guaranteed.',
      isOpen: false
    },
    {
      question: 'Do you provide home loan assistance?',
      answer: 'Yes! We have partnerships with leading banks and NBFCs to help you secure home construction loans at competitive interest rates. Our dedicated finance team assists you throughout the documentation and approval process, making it hassle-free.',
      isOpen: false
    },
    {
      question: 'Can I customize the design of my home?',
      answer: 'Absolutely! Every BuildNest home is fully customizable. Our architects work closely with you to understand your lifestyle, preferences, and budget. From floor plans to elevation designs, interior layouts to smart home features — we build exactly what you envision.',
      isOpen: false
    },
    {
      question: 'What warranty do you provide on construction?',
      answer: 'We offer a comprehensive 10-year structural warranty on all our constructions. This covers the foundation, columns, beams, slabs, and load-bearing walls. Additionally, we provide a 2-year warranty on plumbing, electrical work, and waterproofing. Our after-sales support team is always just a call away.',
      isOpen: false
    }
  ];

  serviceOptions = [
    { value: 'construction', label: 'Home Construction' },
    { value: 'plot', label: 'Plot Inquiry' },
    { value: 'home', label: 'Home Purchase' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'general', label: 'General Inquiry' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      serviceType: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.initFormAnimations();
    this.initFaqAnimations();
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
      this.contactForm.reset();

      // Animate success message
      gsap.from('.form__success', {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      // Reset after 5 seconds
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }, 1500);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
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
    }, '-=0.5');

    // Floating construction elements
    gsap.utils.toArray('.hero__float-element').forEach((el: any, i: number) => {
      gsap.to(el, {
        y: `random(-20, 20)`,
        x: `random(-10, 10)`,
        rotation: `random(-5, 5)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      });
    });

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

  private initFormAnimations(): void {
    const section = this.formSection.nativeElement;

    gsap.from(section.querySelector('.form__header'), {
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8
    });

    // Stagger form fields
    this.formFields.forEach((field, i) => {
      gsap.from(field.nativeElement, {
        scrollTrigger: { trigger: field.nativeElement, start: 'top 90%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, duration: 0.6, delay: i * 0.1,
        ease: 'power2.out'
      });
    });

    // Contact info cards slide from right
    this.contactCards.forEach((card, i) => {
      gsap.from(card.nativeElement, {
        scrollTrigger: { trigger: card.nativeElement, start: 'top 88%', toggleActions: 'play none none none' },
        x: 60, opacity: 0, duration: 0.7, delay: i * 0.12,
        ease: 'power3.out'
      });
    });

    // Map placeholder
    gsap.from(section.querySelector('.contact-info__map'), {
      scrollTrigger: { trigger: section.querySelector('.contact-info__map'), start: 'top 85%', toggleActions: 'play none none none' },
      y: 40, opacity: 0, scale: 0.95, duration: 0.8,
      ease: 'power2.out'
    });
  }

  private initFaqAnimations(): void {
    const section = this.faqSection.nativeElement;

    gsap.from(section.querySelector('.faq__header'), {
      scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8
    });

    this.faqItems.forEach((item, i) => {
      gsap.from(item.nativeElement, {
        scrollTrigger: { trigger: item.nativeElement, start: 'top 90%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.6, delay: i * 0.1,
        ease: 'power2.out'
      });
    });
  }
}
