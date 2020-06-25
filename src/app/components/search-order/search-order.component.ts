import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html'
})
export class SearchOrderComponent implements OnInit {

  @Output() orden = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  seleccionar(orden: string) {
    console.log(orden);
    this.orden.emit(orden);
  }

}
