import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../service/service.index';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { CreateIngsRecipeComponent } from './recipes/create-recipe/create-ings-recipe.component';
import { VerifyTokenGuard } from '../service/guards/verify-token.guard';
import { CreateIntoleranceComponent } from './intolerances/create-intolerance/create-intolerance.component';
import { PlanningComponent } from './diet/planning/planning.component';
import { TrackingComponent } from './diet/tracking/tracking.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard, VerifyTokenGuard],
        children: [
          { path: 'addRecipe', component: CreateRecipeComponent, data: { titulo: 'Añadir receta' } },
          { path: 'addIngsRecipe/:id', component: CreateIngsRecipeComponent, data: { titulo: 'Añadir sustituibles' } },
          { path: 'addIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Añadir intolerancia' } },
          { path: 'users', component: UsersComponent, data: { titulo: 'Usuarios' } },
          { path: 'user/:id', component: UserComponent, data: { titulo: 'Usuario' } },
          { path: 'diet/planning/:id', component: PlanningComponent, data: { titulo: 'Planificación' } },
          { path: 'diet/tracking/:id', component: TrackingComponent, data: { titulo: 'Seguimiento' } }
        ]
    }
];

export const PAGE_ROUTES_PRIVATE = RouterModule.forChild(routes);
