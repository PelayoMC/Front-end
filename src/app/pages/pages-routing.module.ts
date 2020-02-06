import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './main/main.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'home', component: MainComponent },
          { path: 'progress', component: ProgressComponent },
          { path: '', pathMatch: 'full', redirectTo: '/home'}
        ]
    }
];

export const PAGE_ROUTES = RouterModule.forChild(routes);
