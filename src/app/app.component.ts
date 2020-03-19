import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyectoTFG';

  constructor() {
    const val = localStorage.getItem('remember');
    if ( val !== 'true' ) {
      localStorage.clear();
    }
  }
}
