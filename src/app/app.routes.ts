import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProduagregarComponent } from './components/produagregar/produagregar.component';
import { PrudutosComponent } from './components/prudutos/prudutos.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
export const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'register', component:RegisterComponent},

{path: 'produagregar', component:ProduagregarComponent},
{path: 'prudutos', component:PrudutosComponent},
{path: 'catalogo', component:CatalogoComponent},

{path: 'Admin', component:AdminPanelComponent}

];
