import { Injectable } from '@angular/core';
import {
  Plot, HomeListing, Project, ConstructionStage,
  Testimonial, Service, Stat, BlogPost
} from '../models';

@Injectable({ providedIn: 'root' })
export class DataService {

  getStats(): Stat[] {
    return [
      { value: 500, suffix: '+', label: 'Projects Completed', icon: '🏗️' },
      { value: 15, suffix: '+', label: 'Years Experience', icon: '📅' },
      { value: 1200, suffix: '+', label: 'Happy Families', icon: '👨‍👩‍👧‍👦' },
      { value: 50, suffix: '+', label: 'Expert Engineers', icon: '👷' }
    ];
  }

  getServices(): Service[] {
    return [
      {
        id: 1,
        title: 'Home Construction',
        description: 'Build your dream home from foundation to finish with our step-by-step construction expertise. Transparent process, quality materials, on-time delivery.',
        icon: '🏠',
        route: '/services/construction',
        features: ['Architectural Design', 'Foundation to Finish', 'Quality Materials', 'On-time Delivery']
      },
      {
        id: 2,
        title: 'Plot & Land',
        description: 'Discover premium plots in prime locations. Verified titles, clear documentation, and complete legal assistance for your land purchase.',
        icon: '🗺️',
        route: '/plots',
        features: ['Prime Locations', 'Verified Titles', 'Legal Assistance', 'Easy EMI Options']
      },
      {
        id: 3,
        title: 'Buy Ready Home',
        description: 'Move into your new home today. Browse our collection of ready-to-move villas, apartments, and row houses with modern amenities.',
        icon: '🏡',
        route: '/homes',
        features: ['Ready to Move', 'Modern Amenities', 'Flexible Payment', 'Full Furnished Options']
      },
      {
        id: 4,
        title: 'Renovation',
        description: 'Transform your existing space with our expert renovation services. From kitchen remodeling to complete home makeover.',
        icon: '🔨',
        route: '/services/renovation',
        features: ['Interior Design', 'Structural Renovation', 'Kitchen & Bath', 'Smart Home Upgrade']
      }
    ];
  }

  getConstructionStages(): ConstructionStage[] {
    return [
      {
        id: 1, stageNumber: 1, title: 'Consultation & Design',
        description: 'We understand your vision, analyze your plot, and create architectural blueprints tailored to your needs and budget.',
        durationDays: '2-3 Weeks', iconName: '📋',
        details: ['Site visit & soil testing', 'Architectural blueprint creation', '3D elevation design', 'Budget estimation & planning', 'Government approval assistance']
      },
      {
        id: 2, stageNumber: 2, title: 'Foundation & Structure',
        description: 'The backbone of your home. We lay a rock-solid foundation using premium materials and engineering precision.',
        durationDays: '3-4 Weeks', iconName: '🧱',
        details: ['Excavation & leveling', 'PCC & RCC foundation', 'Column & beam framework', 'Earthquake-resistant design', 'Quality concrete mixing']
      },
      {
        id: 3, stageNumber: 3, title: 'Wall Construction',
        description: 'Walls that stand the test of time. Premium bricks and mortar with precise alignment and leveling.',
        durationDays: '4-5 Weeks', iconName: '🏗️',
        details: ['Brick/block wall construction', 'Door & window frame placement', 'Lintel beam casting', 'Plumb & level verification', 'Curing process']
      },
      {
        id: 4, stageNumber: 4, title: 'Roof & Slab',
        description: 'Secure roofing with reinforced concrete slabs, designed for weather resistance and structural integrity.',
        durationDays: '2-3 Weeks', iconName: '🏛️',
        details: ['Shuttering framework', 'Steel reinforcement binding', 'Concrete slab pouring', 'Water tank construction', 'Proper curing (21 days)']
      },
      {
        id: 5, stageNumber: 5, title: 'Electrical & Plumbing',
        description: 'Modern electrical wiring and plumbing systems installed by certified professionals for safety and efficiency.',
        durationDays: '2-3 Weeks', iconName: '⚡',
        details: ['Concealed wiring system', 'MCB distribution board', 'Hot/cold water plumbing', 'Drainage system setup', 'Modular switch planning']
      },
      {
        id: 6, stageNumber: 6, title: 'Plastering & Finishing',
        description: 'Smooth plastering, premium flooring, and polished finishing that gives your home a luxurious feel.',
        durationDays: '3-4 Weeks', iconName: '✨',
        details: ['Internal & external plastering', 'Vitrified tile flooring', 'Granite/marble countertops', 'Bathroom wall tiling', 'Terrace waterproofing']
      },
      {
        id: 7, stageNumber: 7, title: 'Paint & Handover',
        description: 'Premium paint finish, final cleaning, and quality inspection before we hand you the keys to your dream home.',
        durationDays: '2-3 Weeks', iconName: '🎨',
        details: ['Putty & primer coat', 'Premium emulsion paint', 'Exterior weather coat', 'Final quality inspection', 'Key handover ceremony']
      }
    ];
  }

  getPlots(): Plot[] {
    return [
      { id: 1, title: 'Green Valley Plot', location: 'Lucknow, Gomti Nagar Extension', areaSqYd: 150, price: 3750000, pricePerSqYd: 25000, status: 'Available', facingDirection: 'East', images: [], features: ['Gated Community', 'Park Facing', '24/7 Security', 'Underground Wiring'], description: 'Premium east-facing plot in a gated community with all modern amenities.' },
      { id: 2, title: 'Sunrise Heights Plot', location: 'Lucknow, Sultanpur Road', areaSqYd: 200, price: 4000000, pricePerSqYd: 20000, status: 'Available', facingDirection: 'North', images: [], features: ['Corner Plot', 'Road Facing', 'Registry Ready', 'Near Highway'], description: 'Spacious corner plot with excellent connectivity to main highway.' },
      { id: 3, title: 'Royal Meadows Plot', location: 'Lucknow, Raebareli Road', areaSqYd: 120, price: 3000000, pricePerSqYd: 25000, status: 'Available', facingDirection: 'West', images: [], features: ['Park View', 'Temple Nearby', 'Wide Road', 'Peaceful Area'], description: 'Affordable plot in a serene residential area with park view.' },
      { id: 4, title: 'Palm City Plot', location: 'Lucknow, Kanpur Road', areaSqYd: 250, price: 6250000, pricePerSqYd: 25000, status: 'Reserved', facingDirection: 'South', images: [], features: ['Premium Location', 'Club House', 'Swimming Pool', 'Jogging Track'], description: 'Luxury plot in premium township with world-class amenities.' },
      { id: 5, title: 'Lake View Plot', location: 'Lucknow, Shaheed Path', areaSqYd: 180, price: 5400000, pricePerSqYd: 30000, status: 'Available', facingDirection: 'East', images: [], features: ['Lake Facing', 'Peaceful', 'Metro Nearby', 'Green Belt'], description: 'Beautiful lake-facing plot near upcoming metro station.' },
      { id: 6, title: 'Skyline Residency Plot', location: 'Lucknow, Amar Shaheed Path', areaSqYd: 160, price: 4800000, pricePerSqYd: 30000, status: 'Sold', facingDirection: 'North', images: [], features: ['Hospital Nearby', 'School Zone', 'Market Access', '40ft Road'], description: 'Well-connected plot near schools and hospitals.' }
    ];
  }

  getHomes(): HomeListing[] {
    return [
      { id: 1, title: 'Elegance Villa', location: 'Gomti Nagar, Lucknow', bhk: 4, areaSqFt: 2800, price: 12500000, propertyType: 'Villa', status: 'Available', amenities: ['Modular Kitchen', 'Garden', 'Parking', 'CCTV', 'Power Backup'], images: [], isNew: true, bedrooms: 4, bathrooms: 4, description: 'Luxurious 4BHK villa with Italian marble flooring and modular kitchen.' },
      { id: 2, title: 'Urban Heights Apartment', location: 'Hazratganj, Lucknow', bhk: 3, areaSqFt: 1800, price: 7500000, propertyType: 'Apartment', status: 'Available', amenities: ['Gym', 'Swimming Pool', 'Club House', 'Lift', 'Fire Safety'], images: [], isNew: true, bedrooms: 3, bathrooms: 3, description: 'Modern 3BHK apartment in the heart of the city with panoramic views.' },
      { id: 3, title: 'Heritage Row House', location: 'Jankipuram, Lucknow', bhk: 3, areaSqFt: 2200, price: 8500000, propertyType: 'Row House', status: 'Available', amenities: ['Terrace Garden', 'Study Room', 'Servant Quarter', 'Car Porch'], images: [], isNew: false, bedrooms: 3, bathrooms: 3, description: 'Spacious row house with terrace garden and private car parking.' },
      { id: 4, title: 'Royal Duplex', location: 'Aliganj, Lucknow', bhk: 5, areaSqFt: 3500, price: 18000000, propertyType: 'Duplex', status: 'Available', amenities: ['Home Theatre', 'Wine Cellar', 'Pool', 'Smart Home', 'Landscaped Garden'], images: [], isNew: true, bedrooms: 5, bathrooms: 5, description: 'Ultra-luxury duplex with smart home automation and private pool.' },
      { id: 5, title: 'Serene Apartment', location: 'Indira Nagar, Lucknow', bhk: 2, areaSqFt: 1200, price: 4500000, propertyType: 'Apartment', status: 'Upcoming', amenities: ['Parking', 'Lift', 'Security', 'Park'], images: [], isNew: false, bedrooms: 2, bathrooms: 2, description: 'Affordable 2BHK apartment with excellent ventilation and green surroundings.' },
      { id: 6, title: 'Grandeur Villa', location: 'Sushant Golf City, Lucknow', bhk: 4, areaSqFt: 3000, price: 15000000, propertyType: 'Villa', status: 'Available', amenities: ['Golf Course View', 'Private Garden', 'Modular Kitchen', '3-Car Garage'], images: [], isNew: true, bedrooms: 4, bathrooms: 4, description: 'Premium villa overlooking the golf course with world-class finishes.' }
    ];
  }

  getProjects(): Project[] {
    return [
      { id: 1, title: 'The Crown Residency', location: 'Gomti Nagar, Lucknow', completionYear: 2024, category: 'Residential', description: '48-unit luxury apartment complex with rooftop infinity pool and sky lounge.', images: [], testimonial: 'BuildNest delivered beyond our expectations. The quality and attention to detail was outstanding.', clientName: 'Rajesh Sharma', areaSqFt: 85000 },
      { id: 2, title: 'Green Valley Villas', location: 'Sultanpur Road, Lucknow', completionYear: 2023, category: 'Villa Project', description: '24 independent villas with private gardens, smart home features, and community clubhouse.', images: [], testimonial: 'From blueprint to keys, the entire journey was transparent and hassle-free.', clientName: 'Priya Gupta', areaSqFt: 120000 },
      { id: 3, title: 'Metro Business Hub', location: 'Hazratganj, Lucknow', completionYear: 2024, category: 'Commercial', description: 'Modern commercial complex with 60 office spaces, food court, and basement parking.', images: [], testimonial: 'Professional team, on-time delivery, and premium quality construction.', clientName: 'Amit Verma', areaSqFt: 95000 },
      { id: 4, title: 'Sunrise Township', location: 'Raebareli Road, Lucknow', completionYear: 2023, category: 'Township', description: 'Integrated township with 200+ homes, school, hospital, shopping center, and sports complex.', images: [], testimonial: 'A complete living ecosystem. BuildNest created a mini city for us.', clientName: 'Dr. Sanjay Kumar', areaSqFt: 500000 },
      { id: 5, title: 'Heritage Restoration', location: 'Old Lucknow', completionYear: 2024, category: 'Renovation', description: 'Complete restoration of a 100-year-old haveli preserving its Mughal architecture while adding modern amenities.', images: [], testimonial: 'They preserved the soul of our ancestral home while making it livable for today.', clientName: 'Nawab Family', areaSqFt: 15000 },
      { id: 6, title: 'Skyline Apartments', location: 'Shaheed Path, Lucknow', completionYear: 2025, category: 'Residential', description: '22-floor luxury high-rise with sky deck, smart parking, and earthquake-resistant design.', images: [], testimonial: 'The view from the 20th floor is breathtaking. Best investment decision!', clientName: 'Vikram Singh', areaSqFt: 180000 }
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      { id: 1, name: 'Rajesh Sharma', role: 'Homeowner', content: 'BuildNest turned our dream into reality. The entire construction process was transparent, and the quality exceeded our expectations. Every brick tells a story of perfection.', avatar: '', rating: 5, projectName: 'The Crown Residency' },
      { id: 2, name: 'Priya Gupta', role: 'Villa Owner', content: 'From the first consultation to the key handover, the BuildNest team was incredibly professional. Our villa is exactly what we envisioned — beautiful, strong, and luxurious.', avatar: '', rating: 5, projectName: 'Green Valley Villas' },
      { id: 3, name: 'Amit Verma', role: 'Business Owner', content: 'Outstanding commercial construction! The Metro Business Hub was delivered on time with impeccable quality. Their engineering team is top-notch.', avatar: '', rating: 5, projectName: 'Metro Business Hub' },
      { id: 4, name: 'Dr. Sanjay Kumar', role: 'Investor', content: 'BuildNest\'s township project is a masterpiece. Every amenity was thoughtfully planned. The ROI on my investment has been phenomenal.', avatar: '', rating: 5, projectName: 'Sunrise Township' }
    ];
  }

  getBlogPosts(): BlogPost[] {
    return [
      { id: 1, title: '10 Things to Check Before Buying a Plot', slug: '10-things-check-before-buying-plot', excerpt: 'Essential checklist every plot buyer must follow to avoid legal and financial pitfalls.', content: '', category: 'Buying Guide', thumbnailUrl: '', publishedAt: '2024-12-15', author: 'BuildNest Team', readTime: 8 },
      { id: 2, title: 'Home Construction Cost Breakdown 2025', slug: 'home-construction-cost-breakdown-2025', excerpt: 'Understand the complete cost structure — from foundation to finishing — for building your home.', content: '', category: 'Construction', thumbnailUrl: '', publishedAt: '2025-01-10', author: 'BuildNest Team', readTime: 12 },
      { id: 3, title: 'Vastu Shastra Tips for Your New Home', slug: 'vastu-shastra-tips-new-home', excerpt: 'Incorporate vastu principles in your home design for prosperity and positive energy.', content: '', category: 'Design Tips', thumbnailUrl: '', publishedAt: '2025-02-05', author: 'BuildNest Team', readTime: 6 },
      { id: 4, title: 'Kitchen Renovation: Transform Your Cooking Space', slug: 'kitchen-renovation-guide', excerpt: 'Modern kitchen renovation ideas that blend functionality with aesthetic beauty.', content: '', category: 'Renovation', thumbnailUrl: '', publishedAt: '2025-03-20', author: 'BuildNest Team', readTime: 10 },
      { id: 5, title: 'Why Invest in Lucknow Real Estate in 2025', slug: 'invest-lucknow-real-estate-2025', excerpt: 'Lucknow is the next big real estate hub. Here\'s why smart investors are making their move now.', content: '', category: 'Investment', thumbnailUrl: '', publishedAt: '2025-04-01', author: 'BuildNest Team', readTime: 7 },
      { id: 6, title: 'Smart Home Technology: Future of Living', slug: 'smart-home-technology-future', excerpt: 'How smart home automation is revolutionizing modern living and increasing property value.', content: '', category: 'Technology', thumbnailUrl: '', publishedAt: '2025-04-15', author: 'BuildNest Team', readTime: 9 }
    ];
  }
}
