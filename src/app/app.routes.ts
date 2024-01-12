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
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NuevoClienteComponent } from './components/clientes/nuevo-cliente/nuevo-cliente.component';
import { NuevoProveedorComponent } from './components/proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { NuevaVentaComponent } from './components/ventas/nueva-venta/nueva-venta.component';
import { MontoVentaComponent } from './components/ventas/monto-venta/monto-venta.component';

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
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nuevo-proveedor',
    component: NuevoProveedorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nuevo-cliente',
    component: NuevoClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nueva-venta',
    component: NuevaVentaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'monto-venta',
    component: MontoVentaComponent,
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
