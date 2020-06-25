import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RecipesService, IngredientsService, UsersService, VotingService, ModalVoteServiceService, SwalService } from '../../../service/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Votacion } from '../../../models/votacion.model';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: [`
    .puntuacion {
      width: 100%;
    }
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
  `]
})
export class RecipeComponent implements OnInit {

  receta: Recipe = new Recipe();
  etiquetas: string[] = [];
  sustituibles: string[] = [];
  isDataAvailable: boolean;

  // votacion
  votacion: Votacion = new Votacion();
  votado: boolean;
  puntuacion: number;
  puntuacionesTotales: number;

  constructor(private activatedRoute: ActivatedRoute , private location: Location, private recipesService: RecipesService,
              public ingsService: IngredientsService, public router: Router, public usuarioService: UsersService,
              public voteService: VotingService, public modalService: ModalVoteServiceService, public swal: SwalService) {
    this.activatedRoute.params.subscribe(params => {
      this.recipesService.getRecipe(params['id']).subscribe((resp) => {
        if (resp.length === 0) {
          this.swal.crearSwal('comun.alertas.errores.noCargaReceta', 'error');
          this.router.navigate(['recipes']);
        } else {
          this.cargarReceta(resp[0]);
        }
      });
    });
  }

  ngOnInit() {
  }

  cargarReceta(receta: any) {
    Object.assign(this.receta, receta);
    // this.receta.ingredientes.sort(this.compare);
    this.voteService.getVotingRecipe(this.receta._id).subscribe(resp => {
      this.cargarVotaciones(resp[0]);
    });
  }

  cargarVotaciones(votacion: any) {
    Object.assign(this.votacion, votacion);
    this.puntuacion = this.receta.puntuacion;
    this.puntuacionesTotales = this.votacion.total;
    this.votado = this.usuarioVotado(this.votacion.usuarios);
    console.log(this.usuarioService.esUser(), this.votado);
    this.cargarSustituibles();
  }

  // cargarEtiquetasYSustituibles() {
  //   console.log(this.receta.ingredientes.map(el => el._id));
  //   this.ingsService.obtenerEtiquetas(this.receta.ingredientes.map(el => el._id)).subscribe(resp => {
  //     console.log(resp);
  //     this.etiquetas = resp;
  //     console.log(this.receta.ingredientes.map(el => el.ingredienteSustituible));
  //     this.ingsService.getSustituibles(this.receta.ingredientes.map(el => el.ingredienteSustituible)).subscribe((resp: any) => {
  //       console.log(resp);
  //       this.sustituibles = resp.map(el => {
  //         if (el != null) {
  //           return el.nombre;
  //         } else {
  //           return null;
  //         }
  //       });
  //     });
  //   });
  // }

  cargarSustituibles() {
    this.ingsService.getSustituibles(this.receta.ingredientes.map(el => el.ingredienteSustituible)).subscribe((resp: any) => {
      this.sustituibles = resp.map(el => {
        if (el != null) {
          return el.nombre;
        } else {
          return null;
        }
      });
    });
  }

  usuarioVotado(array: string[]) {
    if (array && this.usuarioService.usuario.value && array.includes(this.usuarioService.usuario.value._id)) {
      return true;
    }
    return false;
  }

  compare(a: any, b: any) {
    if (a.tipo > b.tipo) {
      return 1;
    }
    if (a.tipo < b.tipo) {
      return -1;
    }
    return 0;
  }

  color(ing: any) {
    if (ing.tipo === 'Principal') {
      return 'text-danger';
    }
    return 'text-info';
  }

  checkUnidades(uds: string) {
    return uds === 'Sin unidades' ? 'unidad/es' : uds;
  }

  noUnidades(ing: any) {
    if (ing && (ing.unidades === 'Al gusto')) {
      return true;
    }
    return false;
  }

  redondear(numero: number) {
    return Math.round((numero + Number.EPSILON) * 100) / 100;
  }

  retornar() {
    this.location.back();
  }

  llevarAInicio() {
    this.router.navigate(['login']);
  }

  mostrarModal() {
    this.modalService.mostrarModal();
  }

}
