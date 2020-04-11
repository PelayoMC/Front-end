import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../service/service.index';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { CreateIngsRecipeComponent } from './recipes/create-recipe/create-ings-recipe.component';
import { VerifyTokenGuardGuard } from '../service/guards/verify-token-guard.guard';
import { CreateIntoleranceComponent } from './intolerances/create-intolerance/create-intolerance.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard, VerifyTokenGuardGuard],
        children: [
          { path: 'addRecipe', component: CreateRecipeComponent, data: { titulo: 'Añadir receta' } },
          { path: 'addIngsRecipe/:id', component: CreateIngsRecipeComponent, data: { titulo: 'Añadir sustituibles' } },
          { path: 'addIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Añadir intolerancia' } },
          { path: 'users', component: UsersComponent, data: { titulo: 'Usuarios' } },
          { path: 'user/:id', component: UserComponent, data: { titulo: 'Usuario' } }
        ]
    }
];

export const PAGE_ROUTES_PRIVATE = RouterModule.forChild(routes);
