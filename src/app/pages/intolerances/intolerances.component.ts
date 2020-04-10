import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IntolerancesService } from '../../service/service.index';
import { IntoleranceDecorator } from '../../models/decorators/intolerance-decorator.model';
import { UsersService } from '../../service/users/users.service';

@Component({
  selector: 'app-intolerances',
  templateUrl: './intolerances.component.html'
})
export class IntolerancesComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  intolerancias: IntoleranceDecorator[] = [];
  cargando = true;
  from = 0;
  limit = 4;
  total: number;

  constructor(public intolerancesService: IntolerancesService, public userService: UsersService) { }

  ngOnInit() {
    this.cargando = true;
    if (this.busqueda.nativeElement.value.length === 0) {
      this.cargarIntolerancias();
    } else {
      this.buscarIntolerancias(this.busqueda.nativeElement.value);
    }
  }

  cargarIntolerancias() {
    this.cargando = true;
    this.intolerancias = [];
    this.intolerancesService.obtenerInto(this.from, this.limit).subscribe((resp: any) => {
      console.log(resp);
      const ar: IntoleranceDecorator[] = [];
      for (let i = 0; i < resp.intolerancias.length; i++) {
        ar[i] = new IntoleranceDecorator(resp.intolerancias[i], false);
      }
      console.log(ar);
      this.intolerancias = ar;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  buscarIntolerancias(termino: string) {
    if (termino.length <= 0) {
      this.cargarIntolerancias();
      return;
    }
    this.cargando = true;
    this.intolerancias = [];
    this.intolerancesService.buscarIntolerancias(termino, this.from, this.limit).subscribe(
      (resp: any) => {
        console.log(resp);
        this.intolerancias = resp.coleccion;
        this.total = resp.total;
        this.cargando = false;
      }
    );
  }

  actualizarIntolerancia(intolerancia: any) {

  }

  borrarIntolerancia(intolerancia: any) {

  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarIntolerancias();
  }
}
