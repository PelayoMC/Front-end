import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NoFoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: true });
