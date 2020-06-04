import { Component, OnInit } from '@angular/core';
import { UsersService, RecipesService, DietService, ModalCommentDietService, SwalService } from 'src/app/service/service.index';
import { Recipe } from 'src/app/models/recipe.model';
import { Dieta } from 'src/app/models/dieta.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';
import * as data from '../diets.data';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html'
})
export class TrackingComponent implements OnInit {

  dieta: Dieta;
  indexes: number[] = [];
  recetas: Recipe[] = [];
  data = data;
  diaActual = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  cargando = true;

  constructor(public userService: UsersService, public recipesService: RecipesService,
              public dietService: DietService, public modalService: ModalCommentDietService,
              public router: Router, public swal: SwalService) { }

  ngOnInit() {
    const search = [];
    this.dietService.obtenerDietaId(this.userService.usuario.value.dieta).subscribe(resp => {
      this.dieta = resp;
      for (let i = this.diaActual; i < resp.dieta.length; i += 7) {
        search.push(resp.dieta[i]);
        this.indexes.push(i);
      }
      this.recipesService.buscarIds(search.map(el => el.receta)).subscribe(resp => {
        this.recetas = resp;
        this.cargando = false;
      });
    });
  }

  hasNull(array: any[]) {
    return array.some(el => el == null);
  }

  obtenerFecha() {
    const date = new Date();
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1);
  }

  obtenerFechaCompleta() {
    const date = new Date();
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }

  calcularCalorias() {
    let calculo = 0;
    for (let rec of this.recetas) {
      if (rec.calorias.unidades === 'Caloria/s') {
        calculo += rec.calorias.cantidad / 1000;
      } else {
        calculo += rec.calorias.cantidad;
      }
    }
    return calculo;
  }

  enviarComentario(i: number) {
    this.modalService.mostrarModal(this.dieta, this.indexes[i]);
  }

  verReceta(i: number) {
    this.router.navigate(['/recipe', this.recetas[i]._id]);
  }

  borrarFeedback() {
    this.swal.crearSwalBorrar('comun.alertas.borrado.feedback',
    () => {
      this.dieta.feedback = null;
      this.dietService.modificarFeedbackDieta(this.dieta).subscribe((resp: any) => {
        this.swal.crearSwal('comun.alertas.exito.mensajeAdminBorrado', 'success');
      });
    });
  }

  obtenerImagen(i: number) {
    return URL_SERVICIOS + '/imagen/recetas/' + this.recetas[i].imagen;
  }

}
