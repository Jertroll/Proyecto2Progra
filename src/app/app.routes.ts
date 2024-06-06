import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProduagregarComponent } from './components/produagregar/produagregar.component';
import { PrudutosComponent } from './components/prudutos/prudutos.component';

export const routes: Routes = [
{path: '', component:HomeComponent},
{path: 'home', component:HomeComponent},
{path: 'login', component:LoginComponent},
{path: 'produagregar', component:ProduagregarComponent},
{path: 'prudutos', component:PrudutosComponent}
];
