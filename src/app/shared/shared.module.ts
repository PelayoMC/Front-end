import { NgModule } from '@angular/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoFoundComponent } from '../no-found/no-found.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NoFoundComponent
      ],
      exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        NoFoundComponent
      ]
})
export class SharedModule {}