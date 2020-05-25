import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IntolerancesService, UsersService, SwalService } from 'src/app/service/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Filtros } from 'src/app/models/filtros.model';
import { Intolerance } from 'src/app/models/intolerance.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-intolerances',
  templateUrl: './my-intolerances.component.html'
})
export class MyIntolerancesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  intolerancias: Intolerance[] = [];

  user: string;
  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public userService: UsersService, public router: Router,
              public activatedRoute: ActivatedRoute, public swal: SwalService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.obtenerUsuario(params['id']).subscribe(resp => {
        this.user = resp.nombre;
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
    this.userService.obtenerMisIntolerancias(this.from, this.limit).subscribe((resp: any) => {
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
