import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="page-wrapper">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    .page-wrapper {
      min-height: 100vh;
      padding-top: 80px;
    }
    @media (max-width: 991px) {
      .page-wrapper {
        padding-top: 70px;
      }
    }
  `]
})
export class AppComponent {
  title = 'Krishna Construction';
}
