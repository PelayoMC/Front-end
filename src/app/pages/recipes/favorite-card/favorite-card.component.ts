import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UsersService, RecipesService, VotingService, SwalService } from 'src/app/service/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html'
})
export class FavoriteCardComponent implements OnInit {

  @Input() receta: any = {};

  @Output() recetaSeleccionada: EventEmitter<number>;
  @Output() cargar: EventEmitter<number>;

  constructor(private router: Router, public userService: UsersService,
              public recipesService: RecipesService, public voteService: VotingService,
              public swal: SwalService) {
    this.recetaSeleccionada = new EventEmitter();
    this.cargar = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  borrarReceta(receta: any) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.receta',
    () => {
      const us = this.userService.usuario.value;
      const index = us.recetasFavoritas.indexOf(receta._id);
      if (index > -1) {
        us.recetasFavoritas.splice(index, 1);
        this.userService.modificarUsuario(us).subscribe(resp => {
          this.swal.crearSwal('comun.alertas.exito.eliminarRecetaFav', 'success');
          this.cargar.emit(this.receta._id);
        });
      } else {
        this.swal.crearSwal('comun.alertas.errores.noEliminarRecetaFav', 'error');
      }
    });
  }

}
