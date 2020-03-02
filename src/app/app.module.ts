import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app-routing.module';

// Modulos
import { PageModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Servicios
import { SharedService } from './service/shared.service';
import { SidebarService } from './service/sidebar.service';
import { UsersService } from './service/users.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PageModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService, SidebarService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
