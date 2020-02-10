import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages-routing.module';

// Componentes
import { MainComponent } from './main/main.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        ProgressComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent
      ],
      exports:[
        MainComponent,
        ProgressComponent
      ],
      imports: [
        SharedModule,
        PAGE_ROUTES,
        BrowserModule
      ]
})
export class PageModule {}
