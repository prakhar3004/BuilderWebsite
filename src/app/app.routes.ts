import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'BuildNest — Build Your Dream Home'
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-overview/services-overview.component').then(m => m.ServicesOverviewComponent),
    title: 'Our Services — BuildNest'
  },
  {
    path: 'services/construction',
    loadComponent: () => import('./features/services/construction/construction.component').then(m => m.ConstructionComponent),
    title: 'Home Construction — BuildNest'
  },
  {
    path: 'services/renovation',
    loadComponent: () => import('./features/services/renovation/renovation.component').then(m => m.RenovationComponent),
    title: 'Renovation Services — BuildNest'
  },
  {
    path: 'plots',
    loadComponent: () => import('./features/plots/plots.component').then(m => m.PlotsComponent),
    title: 'Premium Plots — BuildNest'
  },
  {
    path: 'homes',
    loadComponent: () => import('./features/buy-home/buy-home.component').then(m => m.BuyHomeComponent),
    title: 'Ready Homes — BuildNest'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Our Projects — BuildNest'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About Us — BuildNest'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us — BuildNest'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component').then(m => m.BlogComponent),
    title: 'Blog — BuildNest'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
