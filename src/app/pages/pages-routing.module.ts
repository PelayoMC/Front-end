import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MainComponent } from './main/main.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home', component: MainComponent },
          { path: 'recipes', component: RecipesComponent },
          { path: 'recipe/:id', component: RecipeComponent },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
