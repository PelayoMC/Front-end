import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { VerifyTokenGuardGuard } from '../service/guards/verify-token-guard.guard';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IntolerancesComponent } from './intolerances/intolerances.component';
import { IntoleranceComponent } from './intolerances/intolerance/intolerance.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [VerifyTokenGuardGuard],
        children: [
          { path: 'home', component: MainComponent, data: { titulo: 'Inicio' } },
          { path: 'recipes', component: RecipesComponent, data: { titulo: 'Recetas' } },
          { path: 'recipe/:id', component: RecipeComponent, data: { titulo: 'Receta' } },
          { path: 'ingredients', component: IngredientsComponent, data: { titulo: 'Ingredientes' } },
          { path: 'intolerances', component: IntolerancesComponent, data: { titulo: 'Intolerancias' } },
          { path: 'intolerance/:id', component: IntoleranceComponent, data: { titulo: 'Intolerancia' } },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
