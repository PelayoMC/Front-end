import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contraseña: new FormControl(null, Validators.required),
      contraseña2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    });
  }

  registrarUsuario(){
    console.log(this.forma.value);
  }

}
