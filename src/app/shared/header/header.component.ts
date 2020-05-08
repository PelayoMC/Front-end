import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { UsersService } from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';
import { LanguageService } from '../../service/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public userService: UsersService, public langService: LanguageService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.userService.usuario.value;
  }

}
