import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UsersService, RecipesService, VotingService } from 'src/app/service/service.index';
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

  constructor( private router: Router, public userService: UsersService, public recipesService: RecipesService, public voteService: VotingService) {
    this.recetaSeleccionada = new EventEmitter();
    this.cargar = new EventEmitter();
   }

  ngOnInit() {
  }

  verReceta() {
    this.recetaSeleccionada.emit(this.receta._id);
  }

  borrarReceta(receta: any) {
    Swal.fire({
      title: '¿Borrar receta?',
      text: 'Está a punto de borrar la receta ' + receta.nombre,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const us = this.userService.usuario.value;
        const index = us.recetasFavoritas.indexOf(receta._id);
        if (index > -1) {
          us.recetasFavoritas.splice(index, 1);
          this.userService.modificarUsuario(us).subscribe(resp => {
            Swal.fire('Receta eliminada', 'Receta eliminada de favoritos correctamente', 'success');
            this.cargar.emit(this.receta._id);
          });
        } else {
          Swal.fire('Receta no eliminada', 'No se ha podido eliminar de favoritos', 'error');
        }
      }
    });
  }

}
