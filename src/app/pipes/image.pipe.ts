import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/imagen';
    if (!img) {
      return url + '/usuarios/xxx';
    }
    // La imagen es una url de por sí
    if (img.indexOf('https') >= 0) {
      return img;
    }
    // La imagen no es una url
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'receta':
        url += '/recetas/' + img;
        break;
      default:
        url += '/usuarios/xxx';
        break;
    }
    return url;
  }

}
