import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IntolerancesService } from '../../../service/service.index';
import { Intolerance } from 'src/app/models/intolerance.model';

@Component({
  selector: 'app-intolerance',
  templateUrl: './intolerance.component.html'
})
export class IntoleranceComponent implements OnInit {

  intolerancia: Intolerance = new Intolerance();

  constructor(public activatedRoute: ActivatedRoute, public intoleranceService: IntolerancesService, public router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.intoleranceService.getInto(params['id']).subscribe((resp) => {
        Object.assign(this.intolerancia, resp[0]);
      });
    });
  }

  ngOnInit() {
  }

  buscarEtiqueta(etiqueta: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        etiqueta
      }
    };
    this.router.navigate(['/intolerances'], navigationExtras);
  }

}
