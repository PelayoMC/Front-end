import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-filters',
  templateUrl: './show-filters.component.html'
})
export class ShowFiltersComponent implements OnInit {

  constructor() { }

  intolerancias = false;
  etiquetas = false;

  @Output() filtros = new EventEmitter<any>();

  ngOnInit() {
  }

  emit() {
    const resp = {
      intolerancias: this.intolerancias,
      etiquetas: this.etiquetas
    };
    this.filtros.emit(resp);
  }

}