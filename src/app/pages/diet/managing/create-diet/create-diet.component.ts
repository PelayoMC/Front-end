import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, RecipesService } from 'src/app/service/service.index';
import { Usuario } from '../../../../models/usuario.model';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html'
})
export class CreateDietComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public usuarioService: UsersService, public recipesService: RecipesService, private router: Router) { }

  recetas: Recipe[] = [];
  usuarioReceta: Usuario;
  from = 0;
  limit = 7;
  total: number;
  cargando = true;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.usuarioService.obtenerUsuario(params['id']).subscribe(resp => {
        this.usuarioReceta = resp;
        this.cargarRecetas();
      });
    });
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarRecetas() {
    this.recipesService.getRecipes(this.from, this.limit).subscribe((resp: any) => {
      this.total = resp.total;
      this.recetas = resp.recetas;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarRecetas();
  }

}
