import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { LoginGuardGuard } from '../service/service.index';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
          { path: 'users', component: UsersComponent },
          { path: 'user/:id', component: UserComponent }
        ]
    }
];

export const PAGE_ROUTES_PRIVATE = RouterModule.forChild(routes);
