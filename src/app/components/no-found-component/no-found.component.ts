import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-found-component',
  templateUrl: './no-found.component.html'
})
export class NoFoundComponentComponent implements OnInit {

  @Input() cargando: boolean;
  @Input() array: any[];

  constructor() { }

  ngOnInit() {
  }

}
