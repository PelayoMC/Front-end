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
    { path: '', pathMatch: 'full', redirectTo: 'home'},
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
                  { path: 'ingredients', component: IngredientsComponent, data: { titulo: 'titulos.paginas.ingredientes' } },
                  { path: 'tags', component: TagsComponent, data: { titulo: 'titulos.paginas.etiquetas' } },
                  { path: 'addRecipe', component: CreateRecipeComponent, data: { titulo: 'titulos.paginas.addReceta' } },
                  { path: 'modRecipe', component: CreateRecipeComponent, data: { titulo: 'titulos.paginas.modReceta' } },
                  { path: 'addIngsRecipe/:id', component: CreateIngsRecipeComponent, data: { titulo: 'titulos.paginas.addSust' } },
                  { path: 'addIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'titulos.paginas.addInt' } },
                  { path: 'modIntolerance', component: CreateIntoleranceComponent, data: { titulo: 'titulos.paginas.modInt' } },
                  { path: 'users', component: UsersComponent, data: { titulo: 'titulos.paginas.usuarios' } },
                  { path: 'diet/managing', component: ManagingComponent, data: { titulo: 'Gestión dieta' } },
                  { path: 'diet/createDiet/:id', component: CreateDietComponent, data: { titulo: 'Crear dieta' } }
                ]
              },
              // REGISTRADO
              { path: 'favorites/:id', component: FavoritesComponent, data: { titulo: 'titulos.paginas.favoritas' } },
              { path: 'myIntolerances/:id', component: MyIntolerancesComponent, data: { titulo: 'titulos.paginas.misIntolerancias' } },
              { path: 'user/:id', component: UserComponent, data: { titulo: 'titulos.paginas.usuario' } },
              { path: 'diet/soliciting', component: SolicitingComponent, data: { titulo: 'titulos.paginas.solicitar' } },
              { path: 'diet/planning/:id', component: PlanningComponent, data: { titulo: 'titulos.paginas.planificar' } },
              { path: 'diet/planning', component: PlanningComponent, data: { titulo: 'titulos.paginas.planificar' } },
              { path: 'diet/tracking', component: TrackingComponent, data: { titulo: 'titulos.paginas.seguimiento' } },
            ]
          },
          // PUBLIC
          { path: 'home', component: MainComponent, data: { titulo: 'titulos.paginas.inicio' } },
          { path: 'search', component: BusquedaComponent, data: { titulo: 'titulos.paginas.busqueda' } },
          { path: 'recipes', component: RecipesComponent, data: { titulo: 'titulos.paginas.recetas' } },
          { path: 'recipe/:id', component: RecipeComponent, data: { titulo: 'titulos.paginas.receta' } },
          { path: 'intolerances', component: IntolerancesComponent, data: { titulo: 'titulos.paginas.intolerancias' } },
          { path: 'intolerance/:id', component: IntoleranceComponent, data: { titulo: 'titulos.paginas.intolerancia' } }
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
