import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise( (resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            resolve( xhr.response );
          } else {
            console.log('FALLO DE SUBIDA DE IMAGEN');
            reject( xhr.response );
          }
        }
      };
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
