import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MainComponent } from './main/main.component';
import { ProgressComponent } from './progress/progress.component';
import { RecipeComponent } from './recipe/recipe.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home', component: MainComponent },
          { path: 'recipes', component: RecipesComponent },
          { path: 'recipe/:id', component: RecipeComponent },
          { path: 'progress', component: ProgressComponent },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
