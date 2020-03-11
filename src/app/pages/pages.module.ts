import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { PipeModule } from '../pipes/pipe.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Rutas
import { PAGE_ROUTES } from './pages-routing.module';
import { PAGE_ROUTES_PRIVATE } from './pages-routing-private.module';

// Componentes
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent,
        CreateRecipeComponent,
        UsersComponent,
        UserComponent
      ],
      exports:[
        MainComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        PAGE_ROUTES,
        PAGE_ROUTES_PRIVATE,
        BrowserModule,
        PipeModule
      ]
})
export class PageModule {}
