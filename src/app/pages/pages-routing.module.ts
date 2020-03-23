import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home', component: MainComponent },
          { path: 'recipes', component: RecipesComponent },
          { path: 'recipe/:id', component: RecipeComponent },
          { path: 'addRecipe', component: CreateRecipeComponent },
          // { path: 'users', component: UsersComponent },
          // { path: 'user/:id', component: UserComponent },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
