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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

// Rutas
import { PAGE_ROUTES } from './pages-routing.module';

// Componentes
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { BusquedaCardComponent } from './busqueda/busqueda-card/busqueda-card.component';
import { SolicitingComponent } from './diet/soliciting/soliciting.component';
import { PlanningComponent } from './diet/planning/planning.component';
import { TrackingComponent } from './diet/tracking/tracking.component';
import { ManagingComponent } from './diet/managing/managing.component';
import { CreateDietComponent } from './diet/managing/create-diet/create-diet.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { RecipeCardComponent } from './recipes/recipe-card/recipe-card.component';
import { FavoriteCardComponent } from './recipes/favorite-card/favorite-card.component';
import { FavoritesComponent } from './recipes/favorites/favorites.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalCreateDietComponent } from '../components/modal-create-diet/modal-create-diet.component';
import { ModalCommentDietComponent } from '../components/modal-comment-diet/modal-comment-diet.component';
import { ModalCreateUserComponent } from '../components/modal-create-user/modal-create-user.component';
import { ModalTagsComponent } from '../components/modal-tags/modal-tags.component';
import { ModalVoteComponent } from '../components/modal-vote/modal-vote.component';
import { ModalFeedbackComponent } from '../components/modal-feedback/modal-feedback.component';
import { SearchTagComponent } from '../components/search-tag/search-tag.component';
import { SearchIntoleranceComponent } from '../components/search-intolerance/search-intolerance.component';
import { CreateIngsRecipeComponent } from './recipes/create-recipe/create-ings-recipe.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IntolerancesComponent } from './intolerances/intolerances.component';
import { IntoleranceComponent } from './intolerances/intolerance/intolerance.component';
import { MyIntolerancesComponent } from './intolerances/my-intolerances/my-intolerances.component';
import { CreateIntoleranceComponent } from './intolerances/create-intolerance/create-intolerance.component';
import { TagsComponent } from './tags/tags.component';
import { ShowFiltersComponent } from '../components/show-filters/show-filters.component';
import { LoadingComponent } from '../components/loading-component/loading.component';
import { NoFoundComponentComponent } from '../components/no-found-component/no-found.component';
import { SearchTypeComponent } from '../components/search-type/search-type.component';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        BusquedaComponent,
        BusquedaCardComponent,
        SolicitingComponent,
        PlanningComponent,
        TrackingComponent,
        ManagingComponent,
        CreateDietComponent,
        RecipesComponent,
        RecipeComponent,
        RecipeCardComponent,
        FavoriteCardComponent,
        FavoritesComponent,
        CreateRecipeComponent,
        CreateIngsRecipeComponent,
        IngredientsComponent,
        IntolerancesComponent,
        IntoleranceComponent,
        MyIntolerancesComponent,
        CreateIntoleranceComponent,
        TagsComponent,
        UsersComponent,
        UserComponent,
        ModalUploadComponent,
        ModalCreateDietComponent,
        ModalCommentDietComponent,
        ModalCreateUserComponent,
        ModalTagsComponent,
        ModalVoteComponent,
        ModalFeedbackComponent,
        LoadingComponent,
        NoFoundComponentComponent,
        SearchTagComponent,
        SearchIntoleranceComponent,
        SearchTypeComponent,
        ShowFiltersComponent
      ],
      exports: [
        MainComponent
      ],
      imports: [
        PAGE_ROUTES,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        BrowserModule,
        PipeModule,
        MatTooltipModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatMenuModule,
        MatTabsModule,
        NgbPaginationModule,
        NgbRatingModule,
        TranslateModule.forRoot()
      ]
})
export class PageModule {}
