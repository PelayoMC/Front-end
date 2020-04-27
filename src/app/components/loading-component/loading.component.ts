import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  @Input() cargando: boolean;

  constructor() { }

  ngOnInit() {
  }

}
