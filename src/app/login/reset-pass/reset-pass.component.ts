import { Component, OnInit } from '@angular/core';
import { UsersService, SwalService, ModalTermsConditionsService } from '../../service/service.index';
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

  constructor(public activatedRoute: ActivatedRoute, public userService: UsersService, public router: Router, public swal: SwalService, public condiciones: ModalTermsConditionsService) { }

  ngOnInit() {
    this.cargando = true;
    this.forma = new FormGroup({
      contraseña: new FormControl(null, Validators.required),
      contraseña2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.userService.equalPasswords('contraseña', 'contraseña2') });
    init_plugins();
    this.activatedRoute.params.subscribe(params => {
      this.userService.obtenerUsuario(params['id']).subscribe(resp => {
        this.usuario = resp;
        this.cargando = false;
      });
    });
  }

  cambiarPassword() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      this.swal.crearSwal('comun.alertas.avisos.condiciones', 'warning');
      return;
    }

    console.log(this.usuario);
    this.userService.loginReset(this.usuario).subscribe(resp => {
      this.usuario.contraseña = this.forma.value.contraseña;
      this.userService.modificarUsuario(this.usuario).subscribe(resp => {
        this.swal.crearSwal('comun.alertas.exito.modificarUsuario', 'success');
        this.router.navigate(['/login']);
      });
    });
  }

  mostrarCondiciones() {
    this.condiciones.mostrarModal();
  }

}
