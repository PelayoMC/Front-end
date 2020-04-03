import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  LoginGuardGuard,
  VerifyTokenGuardGuard,
  IngredientsService,
  ModalCreateUserService,
  ModalUploadService,
  RecipesService,
  SidebarService,
  SharedService,
  UploadImageService,
  UsersService,
  GeneralServiceService,
  SustValidatorService
} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    LoginGuardGuard,
    VerifyTokenGuardGuard,
    IngredientsService,
    ModalCreateUserService,
    ModalUploadService,
    RecipesService,
    SidebarService,
    SharedService,
    UploadImageService,
    UsersService,
    GeneralServiceService,
    SustValidatorService
  ]
})
export class ServiceModule { }
