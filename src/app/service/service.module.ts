import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  LoginGuardGuard,
  VerifyTokenGuardGuard,
  IngredientsService,
  IntolerancesService,
  ModalCreateUserService,
  ModalUploadService,
  ModalTagService,
  RecipesService,
  SidebarService,
  SharedService,
  TagsServiceService,
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
    IntolerancesService,
    ModalCreateUserService,
    ModalUploadService,
    ModalTagService,
    RecipesService,
    SidebarService,
    SharedService,
    TagsServiceService,
    UploadImageService,
    UsersService,
    GeneralServiceService,
    SustValidatorService
  ]
})
export class ServiceModule { }
