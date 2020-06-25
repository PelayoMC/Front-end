import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-show-filters',
  templateUrl: './show-filters.component.html'
})
export class ShowFiltersComponent implements OnInit {

  constructor() { }

  intolerancias = false;
  etiquetas = false;
  tipos = false;
  orden = false;

  @Input() showIntolerancias: boolean;
  @Input() showEtiquetas: boolean;
  @Input() showTipos: boolean;
  @Input() showOrden: boolean;

  @Output() filtros = new EventEmitter<any>();

  ngOnInit() {
  }

  emit() {
    const resp = {
      intolerancias: this.intolerancias,
      etiquetas: this.etiquetas,
      tipos: this.tipos,
      orden: this.orden
    };
    this.filtros.emit(resp);
  }

}
