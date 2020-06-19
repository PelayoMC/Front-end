import { Component, OnInit } from '@angular/core';
import { DietService, UsersService, ModalFeedbackService, SwalService } from '../../../service/service.index';
import { Dieta } from 'src/app/models/dieta.model';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-managing',
  templateUrl: './managing.component.html'
})
export class ManagingComponent implements OnInit {

  constructor(public userService: UsersService, public dietService: DietService,
              public modalFeedback: ModalFeedbackService,
              public router: Router, public swal: SwalService) { }
  sinAsignar: any[] = [];
  asignadas: any[] = [];
  comentarios: any[] = [];
  usuarios: Usuario[] = [];
  coment: Dieta;

  cargando = true;
  from = 0;
  limit = 4;
  totalA: number;
  totalAsig: number;
  totalC: number;

  ngOnInit() {
    this.cargarDietas();
  }

  cargarDietas() {
    this.dietService.obtenerDietasSinAsignar(this.from, this.limit).subscribe(resp => {
      this.sinAsignar = resp.dietas;
      this.totalA = resp.total;
      this.dietService.obtenerDietasAsignadas(this.userService.usuario.value._id, this.from, this.limit).subscribe(resp => {
        this.asignadas = resp.dietas;
        this.totalAsig = resp.total;
        this.dietService.obtenerComentariosDietas(this.userService.usuario.value._id, this.from, this.limit).subscribe(resp => {
          this.comentarios = resp.dietas;
          this.totalC = resp.total;
          this.userService.obtenerUsuarios(this.cargarUsuarios(this.sinAsignar, this.asignadas, this.comentarios)).subscribe(resp => {
            for (const sinAsig of this.sinAsignar) {
              const index = resp.map(el => el._id).indexOf(sinAsig.usuario);
              if (index >= 0) {
                sinAsig.user = resp[index];
              }
            }
            for (const asig of this.asignadas) {
              const index = resp.map(el => el._id).indexOf(asig.usuario);
              if (index >= 0) {
                asig.user = resp[index];
              }
            }
            for (const comment of this.comentarios) {
              const index = resp.map(el => el._id).indexOf(comment.usuario);
              if (index >= 0) {
                comment.user = resp[index];
              }
            }
            this.cargando = false;
          });
        });
      });
    });
  }

  cargarUsuarios(...arrays: any[]) {
    let array: string[] = [];
    for (const ar of arrays) {
      array = array.concat(ar.map(el => el.usuario));
    }
    return array;
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarDietas();
  }

  mostrarCrearDieta(dieta: Dieta) {
    this.router.navigate(['/diet/createDiet', dieta.usuario]);
  }

  mostrarDieta(dieta: Dieta) {
    this.router.navigate(['/diet/planning', dieta._id]);
  }

  mostrarFeedBack(dieta: any) {
    this.dietService.obtenerRecetasDietas(dieta._id).subscribe(resp => {
      for (const rec of dieta.dieta) {
        if (rec.comentario !== null) {
          const index = resp.recetas.map(el => el._id).findIndex(el => el === rec.receta);
          rec.nombre = resp.recetas[index].nombre;
        }
      }
      this.coment = dieta;
    });
    this.modalFeedback.mostrarModal();
  }

  borrarDieta(intolerancia: any) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.dieta',
    () => {
      this.dietService.borrarDieta(intolerancia).subscribe(resp => {
        this.swal.crearSwal('comun.alertas.exito.borrarDieta', 'success');
        this.cargarDietas();
      });
    });
  }

}
