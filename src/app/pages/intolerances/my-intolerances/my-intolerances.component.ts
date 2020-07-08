import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UsersService, SwalService } from 'src/app/service/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Intolerance } from 'src/app/models/intolerance.model';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-my-intolerances',
  templateUrl: './my-intolerances.component.html'
})
export class MyIntolerancesComponent implements OnInit {

  intolerancias: Intolerance[] = [];

  user: Usuario;
  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public userService: UsersService, public router: Router,
              public activatedRoute: ActivatedRoute, public swal: SwalService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.obtenerUsuario(params['id']).subscribe(resp => {
        this.user = resp;
        this.cargarIntolerancias();
      });
    });
  }

  mostrarIntolerancia(int: any) {
    this.router.navigate(['/intolerance', int._id]);
  }

  cargarIntolerancias() {
    this.cargando = true;
    this.intolerancias = [];
    this.userService.obtenerMisIntolerancias(this.user._id, this.from, this.limit).subscribe((resp: any) => {
      this.intolerancias = resp.intolerancias;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  borrarFavIntolerancia(intolerancia: any) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.intolerancia',
    () => {
      const us = this.userService.usuario.value;
      const index = us.misIntolerancias.indexOf(intolerancia._id);
      if (index > -1) {
        us.misIntolerancias.splice(index, 1);
        this.userService.modificarUsuario(us).subscribe(resp => {
          this.swal.crearSwal('comun.alertas.exito.eliminar', 'success');
          this.cargarIntolerancias();
        });
      } else {
        this.swal.crearSwal('comun.alertas.errores.eliminarIntolerancia', 'error');
      }
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarIntolerancias();
  }

}
