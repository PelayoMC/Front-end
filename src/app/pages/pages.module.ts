import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { PipeModule } from '../pipes/pipe.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

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
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalCreateUserComponent } from '../components/modal-create-user/modal-create-user.component';
import { CreateIngsRecipeComponent } from './recipes/create-recipe/create-ings-recipe.component';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent,
        CreateRecipeComponent,
        CreateIngsRecipeComponent,
        UsersComponent,
        UserComponent,
        ModalUploadComponent,
        ModalCreateUserComponent,
      ],
      exports: [
        MainComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        PAGE_ROUTES,
        PAGE_ROUTES_PRIVATE,
        BrowserModule,
        PipeModule,
        MatTooltipModule,
        MatExpansionModule,
        MatFormFieldModule
      ]
})
export class PageModule {}
