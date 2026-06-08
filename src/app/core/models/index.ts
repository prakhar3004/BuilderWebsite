export interface Plot {
  id: number;
  title: string;
  location: string;
  areaSqYd: number;
  price: number;
  pricePerSqYd: number;
  status: 'Available' | 'Sold' | 'Reserved';
  facingDirection: string;
  images: string[];
  features: string[];
  description: string;
}

export interface HomeListing {
  id: number;
  title: string;
  location: string;
  bhk: number;
  areaSqFt: number;
  price: number;
  propertyType: 'Villa' | 'Apartment' | 'Row House' | 'Duplex';
  status: 'Available' | 'Sold' | 'Upcoming';
  amenities: string[];
  images: string[];
  isNew: boolean;
  bedrooms: number;
  bathrooms: number;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  completionYear: number;
  category: string;
  description: string;
  images: string[];
  testimonial: string;
  clientName: string;
  areaSqFt: number;
}

export interface Inquiry {
  id?: number;
  name: string;
  phone: string;
  email: string;
  serviceType: 'construction' | 'plot' | 'home' | 'renovation' | 'general';
  message: string;
  propertyId?: number;
  status?: 'New' | 'Contacted' | 'Closed';
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnailUrl: string;
  publishedAt: string;
  author: string;
  readTime: number;
}

export interface ConstructionStage {
  id: number;
  stageNumber: number;
  title: string;
  description: string;
  durationDays: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  projectName: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  route: string;
  features: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}
