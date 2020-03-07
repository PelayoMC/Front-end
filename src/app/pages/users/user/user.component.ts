import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../service/users/users.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  usuario: Usuario;
  modificando = 'false';

  constructor(public userService: UsersService) { }

  ngOnInit() {
    this.usuario = this.userService.usuario;
  }

}
