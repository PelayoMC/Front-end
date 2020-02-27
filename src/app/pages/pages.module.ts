import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages-routing.module';

// Componentes
import { MainComponent } from './main/main.component';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent
      ],
      exports:[
        MainComponent
      ],
      imports: [
        SharedModule,
        PAGE_ROUTES,
        BrowserModule
      ]
})
export class PageModule {}
