import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, DietService, ModalCreateDietService, ModalObservationsService, SwalService } from 'src/app/service/service.index';
import { Usuario } from '../../../../models/usuario.model';
import { Recipe } from '../../../../models/recipe.model';
import * as data from '../../diets.data';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html'
})
export class CreateDietComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public usuarioService: UsersService,
              public dietaService: DietService, public router: Router,
              public modalService: ModalCreateDietService, public observaciones: ModalObservationsService,
              public swal: SwalService) { }

  usuarioReceta: Usuario;

  recetas: Recipe[][];
  dieta: any[] = [];
  nombresComidas = data.nombresComidas;
  dias = data.dias;
  cargando = true;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.usuarioService.obtenerUsuario(params['id']).subscribe(resp => {
        let ar = new Array(this.nombresComidas.length);
        for (let i = 0; i < ar.length; i++) {
          ar[i] = new Array(this.dias.length);
        }
        this.recetas = ar;
        this.usuarioReceta = resp;
        console.log(this.recetas);
        this.cargando = false;
      });
    });
  }

  kcalDiarias() {
    const us = this.usuarioReceta;
    let TMB;
    if (us.sexo === 'H') {
      TMB = (10 * us.peso) + (6.25 * (us.altura * 100)) - (5 * us.edad) + 5; // Hombre
    } else {
      TMB = (10 * us.peso) + (6.25 * (us.altura * 100)) - (5 * us.edad) - 161; // Mujer
    }
    const number = TMB * us.ejercicio;
    return this.redondear(number);
  }

  redondear(numero: number) {
    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }

  comprobarTabla() {
    for (let j = 0; j < this.recetas[0].length; j++) {
      let sum = 0;
      for (let i = 0; i < this.recetas.length; i++) {
        if (this.recetas[i][j]) {
          sum += this.obtenerCalorias(this.recetas[i][j]);
        }
      }
      if (sum > this.kcalDiarias()) {
        return true;
      }
    }
    return false;
  }

  comprobarColumna(j: number) {
    let sum = 0;
    for (let i = 0; i < this.recetas.length; i++) {
      if (this.recetas[i][j]) {
        sum += this.obtenerCalorias(this.recetas[i][j]);
      }
    }
    return this.limiteCalorico(sum);
  }

  obtenerCalorias(receta: Recipe) {
    if (receta.calorias.unidades === 'Caloria/s') {
      return this.redondear(receta.calorias.cantidad / 1000);
    } else {
      return receta.calorias.cantidad;
    }
  }


  limiteCalorico(valor: number) {
    let ret;
    valor > this.kcalDiarias() ? ret = 'yellow' : ret = 'white' ;
    return ret;
  }

  addReceta(event: any) {
    this.recetas[+event.i][+event.j] = event.receta;
    // console.log(this.comprobarColumna(columna));
    // for (let i = 0; i < this.nombresComidas.length; i++) {
    //   for (let j = 0; j < this.dias.length; j++) {
    //     this.recetas[i][j] = event.receta;
    //   }
    // }
  }

  borrarReceta(i: number, j: number) {
    this.recetas[i][j] = null;
  }

  dietaCompleta() {
    if (this.recetas) {
      for (const fila of this.recetas) {
        if (this.elements(fila) !== this.dias.length) {
          return false;
        }
      }
    }
    return true;
  }

  elements(array: any) {
    let i = 0;
    for (const el of array) {
      if (el != null) {
        i++;
      }
    }
    return i;
  }

  crearDieta() {
    for (let i = 0; i < this.nombresComidas.length; i++) {
      for (let j = 0; j < this.dias.length; j++) {
        this.dieta.push({
          receta: this.recetas[i][j]._id,
          comentario: null
        });
      }
    }
    this.dietaService.obtenerDietaUser(this.usuarioReceta._id).subscribe(resp => {
      resp.dieta = this.dieta;
      resp.admin = this.usuarioService.usuario.value._id;
      console.log(resp);
      this.dietaService.modificarDieta(resp).subscribe(resp => {
        this.usuarioReceta.dieta = resp;
        this.usuarioReceta.notificaciones.push({
          titulo: 'Dieta asignada',
          mensaje: 'Un administrador le ha asignado una dieta'
        });
        this.usuarioService.modificarUsuario(this.usuarioReceta).subscribe(resp => {
          this.swal.crearSwal('comun.alertas.exito.dietaCreada', 'success');
          this.router.navigate(['diet/managing']);
        });
      });
    });
  }

  getTitulo(i: number) {
    return this.nombresComidas[i];
  }

  abrirModal(i: number, j: number) {
    this.modalService.mostrarModal(i, j);
  }

  abrirObservaciones() {
    this.observaciones.mostrarModal(this.usuarioReceta);
  }
}
