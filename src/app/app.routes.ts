import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './auth.guard';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import { AgregarUsuarioComponent } from './components/usuarios/agregar-usuario/agregar-usuario.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nuevo-producto',
    component: AgregarProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nuevo-usuario',
    component: AgregarUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];
