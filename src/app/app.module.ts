import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { MainComponent } from './pages/main/main.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

// Servicios
import { SharedService } from './service/shared.service';
import { SidebarService } from './service/sidebar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoFoundComponent,
    MainComponent,
    ProgressComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SharedService, SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
