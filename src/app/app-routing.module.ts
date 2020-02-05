import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: MainComponent },
      { path: 'progress', component: ProgressComponent },
      { path: '', pathMatch: 'full', redirectTo: '/home'}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
