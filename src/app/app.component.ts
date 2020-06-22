import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';
import { LanguageService } from './service/language/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translateService: TranslateService, private langService: LanguageService, public router: Router, public title: Title) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data.titulo)
    )
    .subscribe((titulo: any) => {
      console.log(titulo);
      this.translateService.get(titulo).subscribe(resp => {
        console.log(resp);
        title.setTitle(resp);
      });
    });
  }
}
