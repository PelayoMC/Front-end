import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages-routing.module';
import { PAGE_ROUTES_PRIVATE } from './pages-routing-private.module';

// Componentes
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent,
        UsersComponent,
        UserComponent
      ],
      exports:[
        MainComponent
      ],
      imports: [
        SharedModule,
        PAGE_ROUTES,
        PAGE_ROUTES_PRIVATE,
        BrowserModule
      ]
})
export class PageModule {}
