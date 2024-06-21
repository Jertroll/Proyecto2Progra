
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProduagregarComponent } from './components/produagregar/produagregar.component';
import { PrudutosComponent } from './components/prudutos/prudutos.component';
import { ComprasComponent } from './components/compras/compras.component';
import { UserAgregarComponent } from './components/UserCreate/user-agregar/user-agregar.component';

export const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full' },
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'produagregar', component:ProduagregarComponent},
{path: 'prudutos', component:PrudutosComponent},
{path: 'compras', component:ComprasComponent},
{path: "userRUD", component:UserAgregarComponent},
{path: 'user-agregar', component:UserAgregarComponent},
{ path: 'user/:id', component: UserAgregarComponent },
{ path: '**', redirectTo: '/home' }
];