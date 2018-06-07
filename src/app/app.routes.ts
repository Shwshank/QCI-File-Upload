import { Routes } from '@angular/router';

import { AuthGuard } from './service/zAuthGuard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  { path: '', component:  DashboardComponent, children: [
    {path: '', component:  DashboardComponent, canActivate: [AuthGuard]},
  ]},
  { path: 'login', component:  LoginComponent },
  { path: '**', redirectTo:'/login' }

];
