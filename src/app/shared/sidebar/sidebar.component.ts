import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../service/service.index';
import { UsersService } from '../../service/users/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: any;
  constructor(public sidebarService: SidebarService, public userService: UsersService) { }

  ngOnInit() {
    this.userService.usuario.subscribe(resp => {
      this.ponerMenu();
    });
  }

  ponerMenu() {
    if (!this.userService.usuario.value) {
      console.log('1');
      this.menu = this.sidebarService.menuNR;
    } else if (this.userService.usuario.value && this.userService.usuario.value.rol === 'ADMIN') {
      console.log('2');
      this.menu = this.sidebarService.menuA;
    } else {
      console.log(this.userService.usuario.value.dieta);
      if (!this.userService.usuario.value.dieta) {
        console.log('3');
        this.menu = this.sidebarService.menuUNo;
      } else {
        console.log('4');
        this.menu = this.sidebarService.menuU;
      }
    }
    console.log(this.menu);
  }
}
