import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsersService } from '../../service/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  from: number = 0;
  total: number = 0;

  constructor(public usuariosService: UsersService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.from).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let value = this.from + valor;
    console.log(value);
    if (value >= this.total || value < 0) {
      return;
    }
    this.from = value;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (termino.length < 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuariosService.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      }
    );
  }

}
