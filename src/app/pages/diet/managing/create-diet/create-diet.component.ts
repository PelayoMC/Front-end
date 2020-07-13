import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, DietService, ModalCreateDietService, ModalObservationsService, SwalService } from 'src/app/service/service.index';
import { Usuario } from '../../../../models/usuario.model';
import { Recipe } from '../../../../models/recipe.model';
import * as data from '../../diets.data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html'
})
export class CreateDietComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public usuarioService: UsersService,
              public dietaService: DietService, public router: Router, public translate: TranslateService,
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
      if (((sum > this.kcalDiarias() + 50) || (sum < this.kcalDiarias() - 50)) && sum !== 0) {
        return true;
      }
    }
    return false;
  }

  calcularCaloriasColumna(j: number) {
    let sum = 0;
    for (let i = 0; i < this.recetas.length; i++) {
      if (this.recetas[i][j]) {
        sum += this.obtenerCalorias(this.recetas[i][j]);
      }
    }
    return sum;
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
    (((valor > this.kcalDiarias() + 50) || (valor < this.kcalDiarias() - 50)) && valor !== 0) ? ret = 'yellow' : ret = 'white' ;
    return ret;
  }

  addReceta(event: any) {
    this.recetas[+event.i][+event.j] = event.receta;
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
    this.cargando = true;
    this.dietaService.obtenerDietaUser(this.usuarioReceta._id).subscribe(resp => {
      resp.dieta = this.dieta;
      resp.admin = this.usuarioService.usuario.value._id;
      this.translate.get('dietas.gestion.noAsig.mensaje').subscribe(mensaje => {
        console.log(mensaje);
        this.dietaService.asignarDieta(resp, mensaje).subscribe(resp => {
          this.usuarioReceta.dieta = resp;
          this.usuarioReceta.notificaciones.push({
            titulo: 'Dieta asignada',
            mensaje: 'Un administrador le ha asignado una dieta'
          });
          this.usuarioService.modificarUsuario(this.usuarioReceta).subscribe(resp => {
            this.swal.crearSwal('comun.alertas.exito.dietaCreada', 'success');
            this.router.navigate(['diet/managing']);
            this.cargando = false;
          });
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
