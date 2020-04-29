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
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { MyIntolerancesComponent } from './intolerances/my-intolerances/my-intolerances.component';
import { ManagingComponent } from './diet/managing/managing.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard, VerifyTokenGuard],
        children: [
          { path: 'addRecipe', component: CreateRecipeComponent, data: { titulo: 'Añadir receta' } },
          { path: 'modRecipe', component: CreateRecipeComponent, data: { titulo: 'Modificar receta' } },
          { path: 'favorites/:id', component: FavoritesComponent, data: { titulo: 'Recetas favoritas' } },
          { path: 'addIngsRecipe/:id', component: CreateIngsRecipeComponent, data: { titulo: 'Añadir sustituibles' } },
          { path: 'addIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Añadir intolerancia' } },
          { path: 'modIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Modificar intolerancia' } },
          { path: 'myIntolerances/:id', component: MyIntolerancesComponent, data: { titulo: 'Mis intolerancias' } },
          { path: 'users', component: UsersComponent, data: { titulo: 'Usuarios' } },
          { path: 'user/:id', component: UserComponent, data: { titulo: 'Usuario' } },
          { path: 'diet/planning/:id', component: PlanningComponent, data: { titulo: 'Planificación' } },
          { path: 'diet/tracking/:id', component: TrackingComponent, data: { titulo: 'Seguimiento' } },
          { path: 'diet/managing/:id', component: ManagingComponent, data: { titulo: 'Seguimiento' } }
        ]
    }
];

export const PAGE_ROUTES_PRIVATE = RouterModule.forChild(routes);
