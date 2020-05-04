import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, ModalCreateDietService } from 'src/app/service/service.index';
import { Usuario } from '../../../../models/usuario.model';
import { Recipe } from '../../../../models/recipe.model';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html'
})
export class CreateDietComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public usuarioService: UsersService, public router: Router, public modalService: ModalCreateDietService) { }

  usuarioReceta: Usuario;

  recetas: Recipe[][];
  nombresComidas = ['Desayuno', 'Comida', 'Merienda', 'Cena'];
  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
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

  verReceta(idx: number) {
    this.router.navigate(['/recipe', idx]);
  }

  getTitulo(i: number) {
    return this.nombresComidas[i];
  }

  abrirModal(i: number, j: number) {
    this.modalService.mostrarModal(i, j);
  }

  addReceta(event: any) {
    console.log(this.recetas);
    this.recetas[+event.i][+event.j] = event.receta;
    console.log(this.recetas);
  }
}
