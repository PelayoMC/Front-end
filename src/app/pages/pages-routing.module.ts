import { Routes, RouterModule } from '@angular/router';

// GUARDS
import { AdminGuard } from '../service/guards/admin.guard';
import { LanguageGuard } from '../service/guards/language.guard';
import { LoginGuard } from '../service/guards/login.guard';
import { VerifyTokenGuard } from '../service/guards/verify-token.guard';

// PUBLIC
import { PagesComponent } from './pages.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MainComponent } from './main/main.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IntolerancesComponent } from './intolerances/intolerances.component';
import { IntoleranceComponent } from './intolerances/intolerance/intolerance.component';
import { TagsComponent } from './tags/tags.component';

// ADMIN
import { UsersComponent } from './users/users.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { CreateIngsRecipeComponent } from './recipes/create-recipe/create-ings-recipe.component';
import { CreateIntoleranceComponent } from './intolerances/create-intolerance/create-intolerance.component';
import { CreateDietComponent } from './diet/managing/create-diet/create-diet.component';
import { ManagingComponent } from './diet/managing/managing.component';

// REGISTRADOS
import { UserComponent } from './users/user/user.component';
import { PlanningComponent } from './diet/planning/planning.component';
import { TrackingComponent } from './diet/tracking/tracking.component';
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { MyIntolerancesComponent } from './intolerances/my-intolerances/my-intolerances.component';
import { SolicitingComponent } from './diet/soliciting/soliciting.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [VerifyTokenGuard, LanguageGuard],
        children: [
          {
            path: '',
            canActivate: [LoginGuard],
            children: [
              {
                path: '',
                canActivate: [AdminGuard],
                children: [
                  // ADMIN
                  { path: 'addRecipe', component: CreateRecipeComponent, data: { titulo: 'Añadir receta' } },
                  { path: 'modRecipe', component: CreateRecipeComponent, data: { titulo: 'Modificar receta' } },
                  { path: 'addIngsRecipe/:id', component: CreateIngsRecipeComponent, data: { titulo: 'Añadir sustituibles' } },
                  { path: 'addIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Añadir intolerancia' } },
                  { path: 'modIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'Modificar intolerancia' } },
                  { path: 'users', component: UsersComponent, data: { titulo: 'Usuarios' } },
                  { path: 'diet/managing', component: ManagingComponent, data: { titulo: 'Gestión dieta' } },
                  { path: 'diet/createDiet/:id', component: CreateDietComponent, data: { titulo: 'Crear dieta' } }
                ]
              },
              // REGISTRADO
              { path: 'favorites/:id', component: FavoritesComponent, data: { titulo: 'Recetas favoritas' } },
              { path: 'myIntolerances/:id', component: MyIntolerancesComponent, data: { titulo: 'Mis intolerancias' } },
              { path: 'user/:id', component: UserComponent, data: { titulo: 'Usuario' } },
              { path: 'diet/soliciting', component: SolicitingComponent, data: { titulo: 'Solicitud dieta' } },
              { path: 'diet/planning', component: PlanningComponent, data: { titulo: 'Planificación dieta' } },
              { path: 'diet/tracking', component: TrackingComponent, data: { titulo: 'Seguimiento dieta' } },
            ]
          },
          // PUBLIC
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
