import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app-routing.module';

// Modulos
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PageModule } from './pages/pages.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ResetPassComponent } from './login/reset-pass/reset-pass.component';
import { ModalTermsConditionsComponent } from './components/modal-terms-conditions/modal-terms-conditions.component';

// Servicios
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPassComponent,
    ModalTermsConditionsComponent,
  ],
  imports: [
    APP_ROUTING,
    BrowserAnimationsModule,
    BrowserModule,
    PageModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
