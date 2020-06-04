import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IntolerancesService, UsersService, SwalService } from '../../service/service.index';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Intolerance } from 'src/app/models/intolerance.model';
import { Filtros } from 'src/app/models/filtros.model';

@Component({
  selector: 'app-intolerances',
  templateUrl: './intolerances.component.html'
})
export class IntolerancesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  intolerancias: Intolerance[] = [];
  etiquetas: string[] = [];
  filtros: Filtros = new Filtros();

  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public intolerancesService: IntolerancesService, public userService: UsersService,
              public router: Router, public route: ActivatedRoute, public swal: SwalService) { }

  ngOnInit() {
    this.cargando = true;
    this.route.queryParams.subscribe(params => {
      if (params.etiqueta) {
        this.etiquetas.push(params.etiqueta);
        this.buscarIntolerancias(this.busqueda.nativeElement.value);
      } else {
        this.cargarIntolerancias();
      }
    });
  }

  mostrarIntolerancia(int: any) {
    this.router.navigate(['/intolerance', int._id]);
  }

  cargarFiltroEtiquetas(event: any) {
    this.etiquetas = [];
    Object.assign(this.etiquetas, event);
  }

  cambiarFiltros(event: any) {
    Object.assign(this.filtros, event);
    if (this.filtros.etiquetas === false) {
      this.etiquetas = [];
    }
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

  buscarIntolerancias(termino: string) {
    this.cargando = true;
    this.from = 0;
    this.intolerancias = [];
    this.intolerancesService.buscarIntolerancias(termino, this.etiquetas, this.from, this.limit).subscribe(
      (resp: any) => {
        this.intolerancias = resp.coleccion;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
      }
    );
  }

  noFavorite(intolerancia: any) {
    return !this.userService.usuario.value.misIntolerancias.includes(intolerancia._id);
  }

  addIntolerancia(intolerancia: any) {
    const us = this.userService.usuario.value;
    us.misIntolerancias.push(intolerancia._id);
    this.userService.modificarUsuario(us).subscribe(resp => {
      this.swal.crearSwal('comun.alertas.exito.añadirIntolerancia', 'success');
      this.cargarIntolerancias();
    });
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
    this.router.navigate(['/modIntolerance'], navigationExtras);
  }

  borrarIntolerancia(intolerancia: any) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.intolerancia',
    () => {
      this.intolerancesService.borrarIntolerancia(intolerancia).subscribe(resp => {
        if (resp.nombre === intolerancia.nombre) {
          this.userService.usuario.value.misIntolerancias = this.userService.usuario.value.misIntolerancias.filter(el => el !== intolerancia._id);
          this.userService.modificarUsuario(this.userService.usuario.value).subscribe(resp => {
            this.swal.crearSwal('comun.alertas.exito.borrarIntolerancia', 'success');
            this.cargarIntolerancias();
          });
        } else {
          this.swal.crearSwal('comun.alertas.errores.borrarIntolerancia', 'error');
        }
      });
    }, intolerancia.nombre);
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarIntolerancias();
  }
}
