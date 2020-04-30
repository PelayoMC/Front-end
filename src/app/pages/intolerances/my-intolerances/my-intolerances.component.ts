import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IntolerancesService, UsersService } from 'src/app/service/service.index';
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

  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public userService: UsersService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.cargando = true;
    this.cargarIntolerancias();
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
    Swal.fire({
      title: '¿Borrar intolerancia?',
      text: 'Está a punto de borrar la intolerancia ' + intolerancia.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const us = this.userService.usuario.value;
        const index = us.misIntolerancias.indexOf(intolerancia._id);
        if (index > -1) {
          us.misIntolerancias.splice(index, 1);
          this.userService.modificarUsuario(us).subscribe(resp => {
            Swal.fire('Intolerancia eliminada', 'Intolerancia eliminada de mis intolerancias correctamente', 'success');
            this.cargarIntolerancias();
          });
        } else {
          Swal.fire('Intolerancia no eliminada', 'No se ha podido eliminar de mis intolerancias', 'error');
        }
      }
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarIntolerancias();
  }

}
