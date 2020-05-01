import { Component, OnInit } from '@angular/core';
import { DietService, UsersService } from '../../../service/service.index';
import { Dieta } from 'src/app/models/dieta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managing',
  templateUrl: './managing.component.html'
})
export class ManagingComponent implements OnInit {

  constructor(public userService: UsersService, public dietService: DietService, public router: Router) { }
  sinAsignar: Dieta[] = [];
  comentarios: Dieta[] = [];
  coment: Dieta;

  cargando = true;
  from = 0;
  limit = 4;
  totalA: number;
  totalC: number;

  ngOnInit() {
    this.cargarDietas();
  }

  cargarDietas() {
    this.dietService.obtenerDietasSinAsignar(this.from, this.limit).subscribe(resp => {
      this.sinAsignar = resp.dietas;
      this.totalA = resp.total;
      this.dietService.obtenerComentariosDietas(this.userService.usuario.value._id, this.from, this.limit).subscribe(resp => {
        this.comentarios = resp.dietas;
        this.totalC = resp.total;
        this.cargando = false;
      });
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarDietas();
  }

  mostrarDieta(dieta: any) {
    this.router.navigate(['/diet/createDiet', this.userService.usuario.value._id]);
  }

  enviarFeedBack(dieta: any) {
    this.coment = dieta;
  }

}
