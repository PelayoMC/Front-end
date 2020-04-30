import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthService,
  DietService,
  LoginGuard,
  VerifyTokenGuard,
  IngredientsService,
  IntolerancesService,
  ModalCreateUserService,
  ModalUploadService,
  ModalTagService,
  ModalVoteServiceService,
  RecipesService,
  SidebarService,
  SharedService,
  TagsService,
  UploadImageService,
  UsersService,
  SustValidatorService,
  VotingService,
  GeneralServiceService
} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    DietService,
    LoginGuard,
    VerifyTokenGuard,
    IngredientsService,
    IntolerancesService,
    ModalCreateUserService,
    ModalUploadService,
    ModalTagService,
    ModalVoteServiceService,
    RecipesService,
    SidebarService,
    SharedService,
    TagsService,
    UploadImageService,
    UsersService,
    SustValidatorService,
    VotingService,
    GeneralServiceService
  ]
})
export class ServiceModule { }
