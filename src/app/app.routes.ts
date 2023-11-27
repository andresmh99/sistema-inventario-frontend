import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', component: LoginComponent }
];
