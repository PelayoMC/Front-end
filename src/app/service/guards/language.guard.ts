import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard implements CanActivate {

  constructor(private translateService: TranslateService, private langService: LanguageService) {}

  canActivate() {
    if (localStorage.getItem('lang')) {
      const idioma = localStorage.getItem('lang');
      this.translateService.setDefaultLang(idioma);
      this.translateService.use(idioma);
    } else {
      this.translateService.setDefaultLang(this.langService.selectedLanguage);
      this.translateService.use(this.langService.selectedLanguage);
      localStorage.setItem('lang', this.langService.selectedLanguage);
    }
    return true;
  }
}
