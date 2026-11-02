import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { LibrosComponent } from './libros-component/libros-component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'libros', component: LibrosComponent }
];
