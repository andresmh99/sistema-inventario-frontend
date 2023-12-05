import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'productos', component: ProductosComponent,  canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];
