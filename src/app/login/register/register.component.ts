import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService, SwalService, ModalTermsConditionsService} from '../../service/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  cargandoEmail = false;


  constructor(public userService: UsersService, public router: Router, public swal: SwalService, public translate: TranslateService, public condiciones: ModalTermsConditionsService) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contraseña: new FormControl(null, Validators.required),
      contraseña2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.userService.equalPasswords('contraseña', 'contraseña2') });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      this.swal.crearSwal('comun.alertas.avisos.condiciones', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.contraseña
    );

    this.cargandoEmail = true;
    this.translate.get('register.mensaje').subscribe(mensaje => {
      this.userService.crearUsuario(usuario, mensaje).subscribe(resp => {
        this.swal.crearSwal('comun.alertas.exito.crearUsuarioRegister', 'success');
        this.cargandoEmail = false;
        this.router.navigate(['/login']);
      });
    });
  }

  mostrarCondiciones() {
    this.condiciones.mostrarModal();
  }
}
