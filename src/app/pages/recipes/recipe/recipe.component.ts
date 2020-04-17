import { Component, OnInit } from '@angular/core';
import { RecipesService, IngredientsService } from '../../../service/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: []
})
export class RecipeComponent implements OnInit {

  receta: Recipe = new Recipe();
  etiquetas: string[] = [];
  sustituibles: string[] = [];
  isDataAvailable: boolean;

  constructor( private activatedRoute: ActivatedRoute , private recipesService: RecipesService, public ingsService: IngredientsService, public router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.recipesService.getRecipe(params['id']).subscribe((resp) => {
        if (resp.length === 0) {
          Swal.fire('Error', 'Error al cargar la receta', 'error');
          this.router.navigate(['recipes']);
        } else {
          Object.assign(this.receta, resp[0]);
          this.receta.ingredientes.sort(this.compare);
          console.log(this.receta.ingredientes);
          this.ingsService.obtenerEtiquetas(this.receta.ingredientes.map(el => el._id)).subscribe(resp => {
            this.etiquetas = resp;
            this.ingsService.getSustituibles(this.receta.ingredientes.map(el => el.ingredienteSustituible)).subscribe((resp: any) => {
              this.sustituibles = resp.map(el => {
                if (el != null) {
                  return el.nombre;
                } else {
                  return null;
                }
              });
            });
          });
        }
      });
    });
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

  ngOnInit() {
  }

  color(ing: any) {
    if (ing.tipo === 'Principal') {
      return 'text-danger';
    }
    return 'text-info';
  }

  noUnidades(ing: any) {
    if (ing && (ing.unidades === 'Al gusto' || ing.unidades === 'Sin unidades')) {
      return true;
    }
    return false;
  }

}
