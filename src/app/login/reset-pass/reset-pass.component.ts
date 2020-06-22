import { Component, OnInit } from '@angular/core';
import { UsersService, SwalService } from '../../service/service.index';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ResetPassComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  cargando: boolean;

  constructor(public activatedRoute: ActivatedRoute, public userService: UsersService, public router: Router, public swal: SwalService) { }

  ngOnInit() {
    this.cargando = true;
    init_plugins();
    this.activatedRoute.params.subscribe(params => {
      this.userService.obtenerUsuario(params['id']).subscribe(resp => {
        this.usuario = resp;
        this.forma = new FormGroup({
          contraseña: new FormControl(null, Validators.required),
          contraseña2: new FormControl(null, Validators.required)
        }, { validators: this.userService.equalPasswords('contraseña', 'contraseña2') });
        this.cargando = false;
      });
    });
  }

}
