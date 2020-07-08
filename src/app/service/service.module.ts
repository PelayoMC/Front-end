import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  AdminGuard,
  LoginGuard,
  VerifyTokenGuard,
  DietService,
  IngredientsService,
  IntolerancesService,
  LanguageService,
  SwalService,
  ModalCreateDietService,
  ModalCommentDietService,
  ModalCreateUserService,
  ModalUploadService,
  ModalFeedbackService,
  ModalObservationsService,
  ModalTagService,
  ModalTermsConditionsService,
  ModalVoteServiceService,
  RecipesService,
  SidebarService,
  TagsService,
  UploadImageService,
  UsersService,
  SustValidatorService,
  VotingService
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
    DietService,
    IngredientsService,
    IntolerancesService,
    LanguageService,
    SwalService,
    ModalCreateDietService,
    ModalCommentDietService,
    ModalCreateUserService,
    ModalUploadService,
    ModalFeedbackService,
    ModalObservationsService,
    ModalTagService,
    ModalTermsConditionsService,
    ModalVoteServiceService,
    RecipesService,
    SidebarService,
    TagsService,
    UploadImageService,
    UsersService,
    SustValidatorService,
    VotingService
  ]
})
export class ServiceModule { }
