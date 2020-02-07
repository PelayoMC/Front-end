import { NgModule } from '@angular/core';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PAGE_ROUTES } from './pages-routing.module';

// Componentes
import { MainComponent } from './main/main.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { RecipesComponent } from './recipes/recipes.component';


@NgModule({
    declarations: [
        PagesComponent,
        MainComponent,
        ProgressComponent,
        RecipesComponent
      ],
      exports:[
        MainComponent,
        ProgressComponent
      ],
      imports: [
        SharedModule,
        PAGE_ROUTES
      ]
})
export class PageModule {}