import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  GeneralServiceService,
  UsersService,
  RecipesService,
  SharedService,
  SidebarService,
  LoginGuardGuard,
  UploadImageService,
  IngredientsService,
  ModalUploadService,
  ModalCreateUserService
} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    GeneralServiceService,
    UsersService,
    RecipesService,
    IngredientsService,
    SharedService,
    SidebarService,
    UploadImageService,
    ModalUploadService,
    ModalCreateUserService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
