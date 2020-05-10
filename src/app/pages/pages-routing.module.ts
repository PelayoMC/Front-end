import { Routes, RouterModule } from '@angular/router';

import { LanguageGuard } from '../service/guards/language.guard';
import { VerifyTokenGuard } from '../service/guards/verify-token.guard';

import { PagesComponent } from './pages.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IntolerancesComponent } from './intolerances/intolerances.component';
import { IntoleranceComponent } from './intolerances/intolerance/intolerance.component';
import { TagsComponent } from './tags/tags.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [VerifyTokenGuard, LanguageGuard],
        children: [
          { path: 'home', component: MainComponent, data: { titulo: 'Inicio' } },
          { path: 'search', component: BusquedaComponent, data: { titulo: 'Busqueda' } },
          { path: 'recipes', component: RecipesComponent, data: { titulo: 'Recetas' } },
          { path: 'recipe/:id', component: RecipeComponent, data: { titulo: 'Receta' } },
          { path: 'ingredients', component: IngredientsComponent, data: { titulo: 'Ingredientes' } },
          { path: 'intolerances', component: IntolerancesComponent, data: { titulo: 'Intolerancias' } },
          { path: 'intolerance/:id', component: IntoleranceComponent, data: { titulo: 'Intolerancia' } },
          { path: 'tags', component: TagsComponent, data: { titulo: 'Etiquetas' } },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
