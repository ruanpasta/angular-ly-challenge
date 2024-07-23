import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'deliveries',
    component: DeliveryPageComponent,
  },
  { path: '**', redirectTo: 'dashboard' }
];
