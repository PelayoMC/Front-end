import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  UsersService,
  RecipesService,
  SharedService,
  SidebarService,
  LoginGuardGuard
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
    LoginGuardGuard
  ]
})
export class ServiceModule { }
