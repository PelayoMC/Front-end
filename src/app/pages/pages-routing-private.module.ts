import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../service/service.index';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';


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
