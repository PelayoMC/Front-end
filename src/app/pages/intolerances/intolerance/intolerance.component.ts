import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntolerancesService } from '../../../service/service.index';
import { Intolerance } from 'src/app/models/intolerance.model';

@Component({
  selector: 'app-intolerance',
  templateUrl: './intolerance.component.html'
})
export class IntoleranceComponent implements OnInit {

  intolerancia: Intolerance = new Intolerance();

  constructor(public activatedRoute: ActivatedRoute, public intoleranceService: IntolerancesService) { 
    this.activatedRoute.params.subscribe(params => {
      this.intoleranceService.getInto(params['id']).subscribe((resp) => {
        console.log(resp[0]);
        console.log(this.intolerancia);
        Object.assign(this.intolerancia, resp[0]);
        console.log(this.intolerancia);
      });
    });
  }

  ngOnInit() {
  }

}
