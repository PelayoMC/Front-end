import { Component, OnInit } from '@angular/core';
import { DietService, UsersService } from '../../../service/service.index';
import { Router } from '@angular/router';
import { Dieta } from 'src/app/models/dieta.model';

@Component({
  selector: 'app-soliciting',
  templateUrl: './soliciting.component.html'
})
export class SolicitingComponent implements OnInit {

  constructor(public dietService: DietService, public userService: UsersService, public router: Router) { }
  dieta: Dieta;

  ngOnInit() {
    this.dietService.obtenerDietaUser(this.userService.usuario.value._id).subscribe(resp => {
      this.dieta = resp[0];
    });
  }

  solicitarDieta() {
    this.dietService.crearDieta().subscribe(resp => {
      this.router.navigate(['/home']);
    });
  }

  hayDatosUsuario() {
    const user = this.userService.usuario.value;
    if (user.edad && user.altura && user.peso) {
      return true;
    }
    return false;
  }

}
