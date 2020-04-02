import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { titulo: 'Iniciar sesión' } },
  { path: 'register', component: RegisterComponent, data: { titulo: 'Registro' } },
  { path: '**', component: NoFoundComponent, data: { titulo: 'No encontrado' } }
];

export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: true });
