import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(public translate: TranslateService) { }

  crearSwal(titulo: string, icono: SweetAlertIcon) {
    console.log(titulo);
    this.translate.get(titulo).subscribe((translated: any) => {
      console.log(translated);
      return Swal.fire({
        title: translated.titulo,
        text: translated.mensaje,
        icon: icono
      });
    });
  }

  crearSwalBorrar(titulo: string, funcion: () => void, mensaje?: string) {
    this.translate.get(titulo).subscribe((translated: any) => {
      console.log(translated);
      return Swal.fire({
        title: translated.titulo,
        text: this.translate.instant(translated.mensaje) + (mensaje ? mensaje : ''),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.translate.instant('comun.alertas.borrado.botones.cancelar'),
        confirmButtonText: this.translate.instant('comun.alertas.borrado.botones.borrar'),
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          funcion();
        }
      });
    });
  }
}
