import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SharedService } from './service/shared.service';
import { SidebarService } from './service/sidebar.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoFoundComponent,
    DashboardComponent,
    ProgressComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SharedService, SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
