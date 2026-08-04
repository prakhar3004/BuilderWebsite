import { Injectable } from '@angular/core';
import {
  Plot, HomeListing, Project, ConstructionStage,
  Testimonial, Service, Stat, BlogPost
} from '../models';

export interface PartnerBrand {
  id: number;
  name: string;
  tagline?: string;
  badge?: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  getCompanyDetails() {
    return {
      name: 'Krishna Construction',
      tagline: 'All Kind Of Deal In Property & Construction & Renovation',
      devotionalTagline: '!! Jai Guru Ji !!',
      proprietor: 'Naveen Sharma',
      phones: ['+91 97170 77387', '+91 79821 00504'],
      rawPhones: ['9717077387', '7982100504'],
      email: 'info@krishnaconstruction.com',
      address: 'Office No. 420, 4th Floor, Soho Precision Tower, Sector-67, Gurugram',
      city: 'Gurugram, Haryana'
    };
  }

  getPartnerBrands(): PartnerBrand[] {
    return [
      { id: 1, name: 'DLF', tagline: 'Building India\'s Finest Properties', badge: 'Premier Partner' },
      { id: 2, name: 'M3M', tagline: 'Our Expertise. Your Joy.', badge: 'Luxury Developer' },
      { id: 3, name: 'SIGNATURE GLOBAL', tagline: 'Making India Affordable', badge: 'Affordable Housing' },
      { id: 4, name: 'TRINITY INFRATECH', tagline: 'Innovating Urban Spaces', badge: 'Infra Excellence' },
      { id: 5, name: 'THE AURRUM', tagline: 'Prestige & Luxury Living', badge: 'Boutique Realty' },
      { id: 6, name: 'WHITELAND', tagline: 'Crafting Iconic Landscapes', badge: 'Prime Developer' }
    ];
  }

  getStats(): Stat[] {
    return [
      { value: 650, suffix: '+', label: 'Property Deals Closed', icon: '🤝' },
      { value: 15, suffix: '+', label: 'Years Experience in NCR', icon: '📅' },
      { value: 1400, suffix: '+', label: 'Satisfied Clients', icon: '👨‍👩‍👧‍👦' },
      { value: 45, suffix: '+', label: 'Expert Engineers & Agents', icon: '👷' }
    ];
  }

  getServices(): Service[] {
    return [
      {
        id: 1,
        title: 'Property Deals (Buying & Selling)',
        description: 'Comprehensive property dealing across prime Gurugram locations. Direct deals with top developers like DLF, M3M, Signature Global, Trinity, Aurrum & Whiteland.',
        icon: '🏢',
        route: '/plots',
        features: ['Prime Gurugram Plots', 'Developer Collaboration', 'Clear Title & Registry', 'Direct Price Negotiation']
      },
      {
        id: 2,
        title: 'Turnkey Construction',
        description: 'Custom residential & commercial building construction from excavation to key handover. Quality raw materials, structural warranty & on-time delivery.',
        icon: '🏗️',
        route: '/services/construction',
        features: ['Architectural Blueprints', 'Foundation to Finish', 'Structural Warranty', 'Vastu-Compliant Designs']
      },
      {
        id: 3,
        title: 'Home & Office Renovation',
        description: 'Complete interior & exterior remodeling, structural renovation, luxury kitchen & bath upgrades, and modern facelift for existing properties.',
        icon: '🔨',
        route: '/services/renovation',
        features: ['Interior Modular Work', 'Structural Upgrades', 'Facade Elevation', 'Waterproofing & Paints']
      },
      {
        id: 4,
        title: 'Ready-to-Move Properties',
        description: 'Browse verified ready villas, high-rise luxury apartments, duplexes, and commercial office spaces in Sector-67 & Golf Course Extension Road.',
        icon: '🏡',
        route: '/homes',
        features: ['Immediate Possession', 'High-Rise Apartments', 'Gated Societies', 'Flexible Payment Plans']
      }
    ];
  }

  getConstructionStages(): ConstructionStage[] {
    return [
      {
        id: 1, stageNumber: 1, title: 'Consultation & Site Analysis',
        description: 'Naveen Sharma and team conduct thorough site inspection in Sector-67 or your chosen plot, assessing requirements and legal compliance.',
        durationDays: '1-2 Weeks', iconName: '📋',
        details: ['Plot layout & soil check', 'Architectural elevation design', 'Budget & transparent cost matrix', 'Local authority approval aid']
      },
      {
        id: 2, stageNumber: 2, title: 'Foundation & Earthwork',
        description: 'Rock-solid RCC foundation engineered to withstand seismic zone guidelines with top grade steel and cement.',
        durationDays: '3-4 Weeks', iconName: '🧱',
        details: ['Excavation & PCC layer', 'Earthquake-resistant RCC column grid', 'Basement/plinth protection', 'Certified cement mixes']
      },
      {
        id: 3, stageNumber: 3, title: 'Brickwork & Superstructure',
        description: 'Heavy duty brickwork with precise alignment, ensuring maximum thermal insulation and structural longevity.',
        durationDays: '4-5 Weeks', iconName: '🏗️',
        details: ['First-class brick masonry', 'Reinforced lintels & chajjas', 'Concealed conduit placement', 'Strict curing schedule']
      },
      {
        id: 4, stageNumber: 4, title: 'Roof Slab & Framework',
        description: 'Heavy RCC roof slab casting with integrated waterproofing and electrical junction boxes.',
        durationDays: '2-3 Weeks', iconName: '🏛️',
        details: ['Steel shuttering system', 'TMT bar grid binding', 'Ready-mix concrete pouring', '21-day curing process']
      },
      {
        id: 5, stageNumber: 5, title: 'Electrical & Plumbing Grid',
        description: 'Concealed copper wiring, MCB protection panels, and high-pressure CPVC/UPVC plumbing networks.',
        durationDays: '2-3 Weeks', iconName: '⚡',
        details: ['Havells/Finolex concealed wires', 'Astral/Finolex plumbing lines', 'Sanitary point mapping', 'Pressure testing of pipes']
      },
      {
        id: 6, stageNumber: 6, title: 'Plaster, Flooring & Renovation',
        description: 'Smooth double-coat plastering, Italian marble / vitrified tiles, modular kitchen fittings, and bathroom tiling.',
        durationDays: '3-4 Weeks', iconName: '✨',
        details: ['Double coat sand plaster', 'Vitrified tile flooring', 'Granite countertops & vanity', 'Terrace waterproofing']
      },
      {
        id: 7, stageNumber: 7, title: 'Paint & Handover Ceremony',
        description: 'Asian Paints royal emulsion finish, final deep cleaning, quality checklist sign-off by Naveen Sharma, and key handover.',
        durationDays: '2 Weeks', iconName: '🎨',
        details: ['Wall putty & primer', 'Weatherproof exterior paint', 'Final audit & safety checks', 'Handover ceremony with blessings']
      }
    ];
  }

  getPlots(): Plot[] {
    return [
      { id: 1, title: 'Sector 67 Soho Heights Plot', location: 'Sector-67, Gurugram', areaSqYd: 250, price: 27500000, pricePerSqYd: 110000, status: 'Available', facingDirection: 'East', images: [], features: ['Near Soho Precision Tower', '24m Wide Road', 'Gated Sector', 'Registry Ready'], description: 'Prime east-facing plot located steps away from Soho Precision Tower, Sector-67 Gurugram.' },
      { id: 2, title: 'Golf Course Extension Luxury Plot', location: 'Golf Course Ext. Road, Gurugram', areaSqYd: 350, price: 42000000, pricePerSqYd: 120000, status: 'Available', facingDirection: 'North-East', images: [], features: ['DLF & M3M Corridor', 'Corner Plot', 'Underground Utilities', 'Immediate Construction'], description: 'Premium corner plot in the heart of Golf Course Extension Road near top luxury townships.' },
      { id: 3, title: 'Dwarka Expressway Commercial Plot', location: 'Dwarka Expressway, Gurugram', areaSqYd: 500, price: 55000000, pricePerSqYd: 110000, status: 'Available', facingDirection: 'North', images: [], features: ['Commercial Zone', 'High Highway Visibility', 'Clear Title', 'High Footfall Area'], description: 'High-value commercial & mixed-use plot directly connected to Dwarka Expressway.' },
      { id: 4, title: 'Signature Global Township Plot', location: 'Sohna Road, Gurugram', areaSqYd: 180, price: 16200000, pricePerSqYd: 90000, status: 'Reserved', facingDirection: 'South-East', images: [], features: ['Gated Security', 'Club House Access', 'Park Facing', 'Easy Bank Loans'], description: 'Gated community residential plot with lush green surroundings and modern township amenities.' },
      { id: 5, title: 'Southern Peripheral Road Plot', location: 'SPR, Sector 68, Gurugram', areaSqYd: 200, price: 21000000, pricePerSqYd: 105000, status: 'Available', facingDirection: 'East', images: [], features: ['60m Sector Road', 'Metro Connectivity', 'Water & Electricity Ready', 'DLF Proximity'], description: 'Strategically located plot along SPR highway corridor with high growth potential.' },
      { id: 6, title: 'Whiteland Corridor Residential Plot', location: 'Sector 76, Gurugram', areaSqYd: 300, price: 33000000, pricePerSqYd: 110000, status: 'Sold', facingDirection: 'North', images: [], features: ['Near Whiteland Projects', 'Wide Frontage', 'Green Belt', 'RERA Approved'], description: 'Spacious residential plot with excellent road connectivity and serene green belt view.' }
    ];
  }

  getHomes(): HomeListing[] {
    return [
      { id: 1, title: 'The Aurrum Signature Villa', location: 'Sector 67, Gurugram', bhk: 4, areaSqFt: 3800, price: 38500000, propertyType: 'Villa', status: 'Available', amenities: ['Modular Kitchen', 'Private Elevator', 'Italian Marble', 'CCTV', 'Power Backup'], images: [], isNew: true, bedrooms: 4, bathrooms: 5, description: 'Luxury 4BHK independent villa built by Krishna Construction with ultra-modern elevation.' },
      { id: 2, title: 'M3M Golf Estate Penthouse', location: 'Golf Course Ext., Gurugram', bhk: 4, areaSqFt: 4500, price: 65000000, propertyType: 'Apartment', status: 'Available', amenities: ['Golf Course View', 'Private Pool', 'Clubhouse', '3 Car Parking', 'Concierge'], images: [], isNew: true, bedrooms: 4, bathrooms: 5, description: 'High-floor 4BHK penthouse with panoramic views of Golf Course Extension Road.' },
      { id: 3, title: 'DLF Gardencity Executive Row House', location: 'Sector 91, Gurugram', bhk: 3, areaSqFt: 2600, price: 24500000, propertyType: 'Row House', status: 'Available', amenities: ['Terrace Garden', 'Smart Automation', 'Servant Room', 'Covered Porch'], images: [], isNew: false, bedrooms: 3, bathrooms: 4, description: 'Elegantly designed row house with private terrace garden in a secure gated township.' },
      { id: 4, title: 'Trinity Infratech Sky Duplex', location: 'Sector 84, Gurugram', bhk: 5, areaSqFt: 4200, price: 49000000, propertyType: 'Duplex', status: 'Available', amenities: ['Home Theatre', 'Double Height Living', 'Private Jacuzzi', 'EV Charging Slot'], images: [], isNew: true, bedrooms: 5, bathrooms: 6, description: 'Ultra-luxurious duplex penthouse with double-height ceiling and bespoke interior finishes.' },
      { id: 5, title: 'Signature Global Park Apartment', location: 'Sohna Road, Gurugram', bhk: 2, areaSqFt: 1150, price: 9500000, propertyType: 'Apartment', status: 'Upcoming', amenities: ['Club House', 'Gym', 'Badminton Court', 'Power Backup'], images: [], isNew: true, bedrooms: 2, bathrooms: 2, description: 'Affordable luxury 2BHK apartment in green township with world-class clubhouse amenities.' },
      { id: 6, title: 'Whiteland Bliss Villa', location: 'Sector 103, Dwarka Expressway', bhk: 4, areaSqFt: 3400, price: 39500000, propertyType: 'Villa', status: 'Available', amenities: ['Landscaped Garden', 'Modular Wardrobes', 'Solar Power', '2-Car Garage'], images: [], isNew: true, bedrooms: 4, bathrooms: 4, description: 'Bespoke independent villa near Dwarka Expressway with solar power & smart security.' }
    ];
  }

  getProjects(): Project[] {
    return [
      { id: 1, title: 'Soho Precision Tower Suite (Office 420)', location: 'Sector-67, Gurugram', completionYear: 2024, category: 'Commercial', description: 'Modern commercial space and headquarters of Krishna Construction in Soho Precision Tower.', images: [], testimonial: 'Naveen Sharma Ji provided transparent consultation and guided our property investment with utmost honesty.', clientName: 'Rajesh Malhotra', areaSqFt: 45000 },
      { id: 2, title: 'Golf Course Ext. Luxury Residences', location: 'Sector 65, Gurugram', completionYear: 2023, category: 'Villa Project', description: 'Bespoke villa construction delivered in record time near M3M & DLF commercial belt.', images: [], testimonial: 'Krishna Construction built our home foundation to roof with zero compromise on quality.', clientName: 'Sanjay Aggarwal', areaSqFt: 85000 },
      { id: 3, title: 'Dwarka Expressway Corporate Hub', location: 'Dwarka Expressway, Gurugram', completionYear: 2024, category: 'Commercial', description: 'Turnkey commercial building construction with modern glass facade and basement parking.', images: [], testimonial: 'Professional execution by Naveen Sharma & team. On-time delivery and top-notch materials.', clientName: 'Sunil Verma', areaSqFt: 110000 },
      { id: 4, title: 'Sector 67 Independent Floors', location: 'Sector-67, Gurugram', completionYear: 2023, category: 'Residential', description: '4-story luxury independent floors with basement parking & private terrace rights.', images: [], testimonial: 'Best property deal in Sector 67. Transparent documentation and smooth registry process.', clientName: 'Kapil Dev Sharma', areaSqFt: 60000 },
      { id: 5, title: 'DLF Phase V Villa Renovation', location: 'DLF Phase V, Gurugram', completionYear: 2024, category: 'Renovation', description: 'Complete structural makeover, luxury elevation revamp, and interior remodeling of a 15-year villa.', images: [], testimonial: 'Transformed our legacy villa into a modern masterpiece. Krishna Construction is top tier!', clientName: 'Rohan Mehra', areaSqFt: 18000 },
      { id: 6, title: 'SPR Premium Township Deals', location: 'Southern Peripheral Road, Gurugram', completionYear: 2025, category: 'Township', description: 'Strategic plot deals & custom building collaboration across SPR developer projects.', images: [], testimonial: 'Guaranteed best rates and complete peace of mind when dealing with Naveen Sharma Ji.', clientName: 'Vikas Hooda', areaSqFt: 250000 }
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      { id: 1, name: 'Rajesh Malhotra', role: 'Investor & Business Owner', content: 'Krishna Construction made our property purchase in Sector-67 Gurugram completely seamless. Naveen Sharma Ji\'s personal attention and honesty built immense trust.', avatar: '', rating: 5, projectName: 'Soho Precision Tower Suite' },
      { id: 2, name: 'Sanjay Aggarwal', role: 'Villa Owner', content: 'We hired Krishna Construction for our villa construction near Golf Course Extension Road. The quality of cement, steel, and finishing exceeded our highest expectations.', avatar: '', rating: 5, projectName: 'Golf Course Ext. Luxury Residences' },
      { id: 3, name: 'Sunil Verma', role: 'Commercial Client', content: 'From property selection to complete structural renovation, Naveen Sharma Ji is a master of real estate and construction in Gurugram.', avatar: '', rating: 5, projectName: 'Dwarka Expressway Corporate Hub' },
      { id: 4, name: 'Kapil Dev Sharma', role: 'Homeowner', content: 'Highly professional property dealers and builders! They got us an unbeatable deal with top developer partners and delivered our home on schedule.', avatar: '', rating: 5, projectName: 'Sector 67 Independent Floors' }
    ];
  }

  getBlogPosts(): BlogPost[] {
    return [
      { id: 1, title: 'Why Sector 67 & Golf Course Ext. Road are Gurugram\'s Top Investment Hubs', slug: 'sector-67-golf-course-ext-investment', excerpt: 'Discover why property deals in Sector-67 and Golf Course Extension Road yield maximum returns.', content: '', category: 'Gurugram Real Estate', thumbnailUrl: '', publishedAt: '2025-01-10', author: 'Naveen Sharma', readTime: 7 },
      { id: 2, title: 'Complete Cost Matrix for House Construction in Gurugram 2025', slug: 'house-construction-cost-gurugram-2025', excerpt: 'Understand the itemized breakdown for building your dream home from foundation to luxury paint.', content: '', category: 'Construction Guide', thumbnailUrl: '', publishedAt: '2025-01-28', author: 'Krishna Construction Team', readTime: 10 },
      { id: 3, title: 'DLF, M3M & Signature Global: Choosing the Right Developer Partner', slug: 'choosing-developer-partner-gurugram', excerpt: 'A comprehensive comparison of top Gurugram developers for plots, ready homes, and commercial units.', content: '', category: 'Property Deals', thumbnailUrl: '', publishedAt: '2025-02-15', author: 'Naveen Sharma', readTime: 8 },
      { id: 4, title: 'Home Renovation Checklist: Structural & Elevation Upgrades', slug: 'home-renovation-checklist-gurugram', excerpt: 'How to remodel your existing property to increase market valuation by up to 40%.', content: '', category: 'Renovation', thumbnailUrl: '', publishedAt: '2025-03-05', author: 'Krishna Construction Team', readTime: 6 },
      { id: 5, title: 'Vastu Shastra Guidelines for East & North Facing Plots', slug: 'vastu-shastra-guidelines-plots', excerpt: 'Key architectural rules to follow while planning room layouts, entrance gates, and staircases.', content: '', category: 'Architecture & Design', thumbnailUrl: '', publishedAt: '2025-03-22', author: 'Naveen Sharma', readTime: 9 },
      { id: 6, title: 'Dwarka Expressway & SPR Growth Corridor: 2025 Property Outlook', slug: 'dwarka-expressway-spr-property-outlook', excerpt: 'Insights on upcoming metro corridors, commercial hubs, and high-yield residential plot projects.', content: '', category: 'Market Analysis', thumbnailUrl: '', publishedAt: '2025-04-12', author: 'Naveen Sharma', readTime: 8 }
    ];
  }
}

