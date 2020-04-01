import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { VerifyTokenGuardGuard } from '../service/guards/verify-token-guard.guard';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home', component: MainComponent, canActivate: [VerifyTokenGuardGuard], data: { titulo: 'Inicio' } },
          { path: 'recipes', component: RecipesComponent, data: { titulo: 'Recetas' } },
          { path: 'recipe/:id', component: RecipeComponent, data: { titulo: 'Receta' } },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
