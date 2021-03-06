import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { RecipesService } from 'src/app/service/service.index';
import { Recipe } from 'src/app/models/recipe.model';
import { ModalCreateDietService } from '../../service/service.index';
import { Filtros } from 'src/app/models/filtros.model';

@Component({
  selector: 'app-modal-create-diet',
  templateUrl: './modal-create-diet.component.html'
})
export class ModalCreateDietComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  @Output() receta = new EventEmitter<any>();

  recetas: Recipe[] = [];
  tipos: string[] = [];
  intolerancias: string[] = [];
  tags: string[] = [];
  orden = 'nombre';
  filtros: Filtros = new Filtros();

  from = 0;
  limit = 4;
  to = 4;
  total: number;
  cargando = true;

  constructor(public recipesService: RecipesService, public modalService: ModalCreateDietService) { }

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarFiltroTipos(event: any) {
    this.tipos = [];
    Object.assign(this.tipos, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0, 4);
  }

  cargarFiltroIntolerancias(event: any) {
    this.intolerancias = [];
    Object.assign(this.intolerancias, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0, 4);
  }

  cargarFiltroEtiquetas(event: any) {
    this.tags = [];
    Object.assign(this.tags, event);
    this.buscarRecetas(this.busqueda.nativeElement.value, 0, 4);
  }

  cargarFiltroOrden(event: any) {
    this.orden = event;
    this.buscarRecetas(this.busqueda.nativeElement.value, 0, 4);
  }

  cambiarFiltros(event: any) {
    Object.assign(this.filtros, event);
    if (this.filtros.intolerancias === false) {
      this.intolerancias = [];
    }
    if (this.filtros.tipos === false) {
      this.tipos = [];
    }
    if (this.filtros.orden === false) {
      this.orden = '';
    }
  }

  ocultarModal() {
    this.modalService.oculto = 'oculto';
  }

  cargarRecetas() {
    this.recipesService.getRecipes(this.from, this.limit).subscribe((resp: any) => {
      this.total = resp.total;
      this.recetas = resp.recetas;
      this.cargando = false;
    });
  }

  buscarRecetas(termino: string, valor: number, valorTo: number) {
    console.log(valor, valorTo);
    this.from = valor;
    this.to = valorTo;
    this.cargando = true;
    this.recipesService.buscarRecetas(termino, this.tipos, this.intolerancias, this.tags, this.orden, valor, valorTo).subscribe(
      (resp: any) => {
        const recetas: Recipe[] = resp.coleccion;
        this.recetas = recetas;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
      }
    );
  }

  escogerReceta(re: any) {
    const recipe = {
      receta: re,
      i: this.modalService.i,
      j: this.modalService.j
    };
    this.receta.emit(recipe);
    this.ocultarModal();
  }

  label(nombre: string) {
    switch (nombre) {
      case 'Desayuno': return 'label label-success';
      case 'Comida': return 'label label-info';
      case 'Merienda': return 'label label-warning';
      case 'Cena': return 'label label-danger';
    }
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.to += valor;
    this.buscarRecetas(this.busqueda.nativeElement.value, this.from, this.to);
  }

}
