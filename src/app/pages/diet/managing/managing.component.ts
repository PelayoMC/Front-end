import { Component, OnInit } from '@angular/core';
import { DietService, UsersService, ModalFeedbackService } from '../../../service/service.index';
import { Dieta } from 'src/app/models/dieta.model';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-managing',
  templateUrl: './managing.component.html'
})
export class ManagingComponent implements OnInit {

  constructor(public userService: UsersService, public dietService: DietService, public modalFeedback: ModalFeedbackService, public router: Router) { }
  sinAsignar: any[] = [];
  comentarios: any[] = [];
  usuarios: Usuario[] = [];
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
        this.userService.obtenerUsuarios(this.cargarUsuarios(this.sinAsignar, this.comentarios)).subscribe(resp => {
          console.log(this.sinAsignar);
          console.log(this.comentarios);
          console.log(resp);
          let x = 0;
          while (x < this.sinAsignar.length) {
            this.sinAsignar[x].user = resp[x].nombre;
            x++;
          }
          while (x < this.comentarios.length) {
            this.comentarios[x].user = resp[x].nombre;
            x++;
          }
          this.cargando = false;
        });
      });
    });
  }

  cargarUsuarios(...arrays: any[]) {
    let array: string[] = [];
    for (let ar of arrays) {
      array = array.concat(ar.map(el => el.usuario));
    }
    return array;
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarDietas();
  }

  mostrarDieta(dieta: Dieta) {
    this.router.navigate(['/diet/createDiet', dieta.usuario]);
  }

  mostrarFeedBack(dieta: any) {
    this.dietService.obtenerRecetasDietas(dieta._id).subscribe(resp => {
      for (let rec of dieta.dieta) {
        if (rec.comentario !== null) {
          let index = resp.recetas.map(el => el._id).findIndex(el => el === rec.receta);
          rec.nombre = resp.recetas[index].nombre;
        }
      }
      this.coment = dieta;
      console.log(this.coment);
    });
    this.modalFeedback.mostrarModal();
  }

}
