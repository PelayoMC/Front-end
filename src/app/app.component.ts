import { Component } from '@angular/core';
import { GeneralServiceService } from './service/service.index';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoTFG';

  constructor(public general: GeneralServiceService, public router: Router) {
    this.general.checkConnection().subscribe((resp: any) => {
      const val = parseInt(localStorage.getItem('timer'), 10);
      const act = new Date().getTime();
      // Menos de 15 minutos
      if ( !(val > 0) ) {
          if ((act - val) > 900000) {
            Swal.fire('Sesión terminada', 'Se ha cerrado la sesión de usuario', 'info');
          }
          localStorage.clear();
          this.router.navigate(['/home']);
        }
    });
  }
}
