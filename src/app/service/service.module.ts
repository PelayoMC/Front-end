import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  UsersService,
  RecipesService,
  SharedService,
  SidebarService,
  LoginGuardGuard,
  UploadImageService
} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    UsersService,
    RecipesService,
    SharedService,
    SidebarService,
    UploadImageService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
