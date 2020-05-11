import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AdminGuard,
  LoginGuard,
  VerifyTokenGuard,
  AuthService,
  DietService,
  IngredientsService,
  IntolerancesService,
  LanguageService,
  ModalCreateDietService,
  ModalCommentDietService,
  ModalCreateUserService,
  ModalUploadService,
  ModalFeedbackService,
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
    AdminGuard,
    LoginGuard,
    VerifyTokenGuard,
    AuthService,
    DietService,
    IngredientsService,
    IntolerancesService,
    LanguageService,
    ModalCreateDietService,
    ModalCommentDietService,
    ModalCreateUserService,
    ModalUploadService,
    ModalFeedbackService,
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
