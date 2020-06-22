import { Routes, RouterModule } from '@angular/router';
import { LanguageGuard } from './service/guards/language.guard';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ResetPassComponent } from './login/reset-pass/reset-pass.component';
import { NoFoundComponent } from './no-found/no-found.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [LanguageGuard],
    children: [
      { path: 'login', component: LoginComponent, data: { titulo: 'titulos.login' } },
      { path: 'register', component: RegisterComponent, data: { titulo: 'titulos.register' } },
      { path: 'reset/:id', component: ResetPassComponent, data: { titulo: 'titulos.reset' } },
      { path: '**', component: NoFoundComponent, data: { titulo: 'titulos.noFind' } }
    ]
  }
];

export const APP_ROUTING = RouterModule.forRoot(routes, { useHash: false });
