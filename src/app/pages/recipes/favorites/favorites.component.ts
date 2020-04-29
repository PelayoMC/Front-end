import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { UsersService } from 'src/app/service/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  recetas: Recipe[] = [];
  from = 1;
  tam = 9;
  total: number;
  cargando = true;

  constructor(private userService: UsersService, private router: Router ) { }

  ngOnInit() {
    this.cargarRecetas(--this.from);
  }

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  cargarRecetas(from) {
    this.cargando = true;
    this.userService.obtenerRecetasFavoritas(this.from, this.tam).subscribe((resp: any) => {
      this.recetas = resp.recetas;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  cambiarPag(event: any) {
    this.cargarRecetas(--event * this.tam);
  }
}
