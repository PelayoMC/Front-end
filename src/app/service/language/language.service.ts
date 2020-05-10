import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selectedLanguage = 'es';

  constructor(private translateService: TranslateService) {
  }

  toogleLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translateService.use(lang);
    localStorage.setItem('lang', lang);
  }

  toggleFlag() {
    const idioma = localStorage.getItem('lang') ? localStorage.getItem('lang') : this.selectedLanguage;
    switch (idioma) {
      case 'es': return 'flag-icon flag-icon-es';
      case 'en': return 'flag-icon flag-icon-gb';
    }
  }
}
