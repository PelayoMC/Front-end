import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IntolerancesService, UsersService } from '../../service/service.index';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Intolerance } from 'src/app/models/intolerance.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intolerances',
  templateUrl: './intolerances.component.html'
})
export class IntolerancesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  intolerancias: Intolerance[] = [];
  etiquetas: string[] = [];

  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public intolerancesService: IntolerancesService, public userService: UsersService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.cargando = true;
    this.route.queryParams.subscribe(params => {
      if (params.etiqueta) {
        this.etiquetas.push(params.etiqueta);
        this.buscarIntolerancias(this.busqueda.nativeElement.value, this.etiquetas);
      } else {
        if (this.busqueda.nativeElement.value.length === 0) {
          this.cargarIntolerancias();
        } else {
          this.buscarIntolerancias(this.busqueda.nativeElement.value, this.etiquetas);
        }
      }
    });
  }

  mostrarIntolerancia(int: any) {
    this.router.navigate(['/intolerance', int._id]);
  }

  cargarFiltro(event: any) {
    Object.assign(this.etiquetas, event);
  }

  cargarIntolerancias() {
    this.cargando = true;
    this.intolerancias = [];
    this.intolerancesService.obtenerInto(this.from, this.limit).subscribe((resp: any) => {
      this.intolerancias = resp.intolerancias;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  reload() {
    this.router.navigate(['intolerances']);
  }

  buscarIntolerancias(termino: string, etiquetas: string[]) {
    if (termino.length <= 0 && etiquetas.length === 0) {
      this.cargarIntolerancias();
      return;
    }
    this.cargando = true;
    this.from = 0;
    this.intolerancias = [];
    this.intolerancesService.buscarIntolerancias(termino, etiquetas, this.from, this.limit).subscribe(
      (resp: any) => {
        this.intolerancias = resp.coleccion;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
      }
    );
  }

  actualizarIntolerancia(intolerancia: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        _id: intolerancia._id,
        nombre: intolerancia.nombre,
        descripcion: intolerancia.descripcion,
        noApto: intolerancia.noApto,
        imagen: intolerancia.imagen
      }
    };
    this.router.navigate(['/addIntolerance'], navigationExtras);
  }

  borrarIntolerancia(intolerancia: any) {
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
        this.intolerancesService.borrarIntolerancia(intolerancia).subscribe(resp => {
          if (resp.nombre === intolerancia.nombre) {
            Swal.fire(
              'Intolerancia borrada',
              'La intolerancia ha sido borrada correctamente',
              'success'
            );
            this.cargarIntolerancias();
          } else {
            Swal.fire(
              'Intolerancia no borrada',
              'La intolerancia no se ha podido borrar correctamente',
              'error'
            );
          }
        })
      }
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarIntolerancias();
  }
}
