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

  menu: any;
  constructor(public sidebarService: SidebarService, public userService: UsersService) { }

  ngOnInit() {
    if (!this.userService.usuario) {
      this.menu = this.sidebarService.menuNR;
    } else if (this.userService.usuario && this.userService.usuario.rol === 'ADMIN') {
      this.menu = this.sidebarService.menuA;
    } else {
      this.menu = this.sidebarService.menuU;
    }
  }

}
