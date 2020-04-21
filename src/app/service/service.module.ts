import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  LoginGuard,
  VerifyTokenGuard,
  IngredientsService,
  IntolerancesService,
  ModalCreateUserService,
  ModalUploadService,
  ModalTagService,
  RecipesService,
  SidebarService,
  SharedService,
  TagsService,
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
    LoginGuard,
    VerifyTokenGuard,
    IngredientsService,
    IntolerancesService,
    ModalCreateUserService,
    ModalUploadService,
    ModalTagService,
    RecipesService,
    SidebarService,
    SharedService,
    TagsService,
    UploadImageService,
    UsersService,
    GeneralServiceService,
    SustValidatorService
  ]
})
export class ServiceModule { }
