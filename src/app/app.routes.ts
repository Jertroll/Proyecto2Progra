
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProduagregarComponent } from './components/produagregar/produagregar.component';
import { PrudutosComponent } from './components/prudutos/prudutos.component';
import { UserAgregarComponent } from './components/UserCreate/user-agregar/user-agregar.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CompraComponent } from './components/compra/compra.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { UserupComponent } from './components/UserCreate/userup/userup.component';
import { ListadoFacturasComponent } from './components/lista-factura/lista-factura.component';
import { FacturaListUserComponent } from './components/factura-list-user/factura-list-user.component';



export const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' },
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'Admin2', component:AdminPanelComponent},
{path: 'register', component:RegisterComponent},
{path: 'compras3',component:CompraComponent},
{path: 'produagregar', component:ProduagregarComponent},
{path: 'prudutos', component:PrudutosComponent},
{path: 'catalogo', component:CatalogoComponent},
{path: 'carrito', component:CarritoComponent},
{path: 'facturas', component: ListadoFacturasComponent },
{path: "userRUD", component:UserAgregarComponent},
{path: 'users12', component:UserupComponent},
{path: 'user-agregar', component:UserAgregarComponent},
{path: 'user/:id', component: UserAgregarComponent },
{path:'facturasUser',component:FacturaListUserComponent},
{path: '**', redirectTo: '/home' }

];



