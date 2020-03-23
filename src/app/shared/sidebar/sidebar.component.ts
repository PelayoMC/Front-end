import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/service.index';
import { UsersService } from '../../service/users/users.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor(public sidebarService: SidebarService, public userService: UsersService) { }

  ngOnInit() {
    if (this.userService.usuario) {
      this.usuario = this.userService.usuario;
    }
  }

}
