import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Krishna Construction — Property, Construction & Renovation'
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-overview/services-overview.component').then(m => m.ServicesOverviewComponent),
    title: 'Our Services — Krishna Construction'
  },
  {
    path: 'services/construction',
    loadComponent: () => import('./features/services/construction/construction.component').then(m => m.ConstructionComponent),
    title: 'Property & Construction — Krishna Construction'
  },
  {
    path: 'services/renovation',
    loadComponent: () => import('./features/services/renovation/renovation.component').then(m => m.RenovationComponent),
    title: 'Renovation Services — Krishna Construction'
  },
  {
    path: 'plots',
    loadComponent: () => import('./features/plots/plots.component').then(m => m.PlotsComponent),
    title: 'Property Deals & Plots — Krishna Construction'
  },
  {
    path: 'homes',
    loadComponent: () => import('./features/buy-home/buy-home.component').then(m => m.BuyHomeComponent),
    title: 'Ready Properties — Krishna Construction'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Our Projects — Krishna Construction'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About Us — Krishna Construction'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us — Krishna Construction (Naveen Sharma)'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
    title: 'Real Estate Blog — Krishna Construction'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
