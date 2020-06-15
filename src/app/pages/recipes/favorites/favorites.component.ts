import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { UsersService } from 'src/app/service/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  user: Usuario;
  recetas: Recipe[] = [];
  from = 1;
  tam = 9;
  total: number;
  cargando = true;

  constructor(public activatedRoute: ActivatedRoute, public userService: UsersService, public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.obtenerUsuario(params['id']).subscribe(resp => {
        this.user = resp;
        this.cargarRecetas(--this.from);
      });
    });
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarRecetas(from) {
    this.cargando = true;
    this.userService.obtenerRecetasFavoritas(this.user._id, this.from, this.tam).subscribe((resp: any) => {
      this.recetas = resp.recetas;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  cambiarPag(event: any) {
    this.cargarRecetas(--event * this.tam);
  }
}
