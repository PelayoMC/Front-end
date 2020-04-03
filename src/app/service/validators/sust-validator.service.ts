import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SustValidatorService {

  constructor() { }

  sustValid(control: FormControl): {[s: string]: boolean} {
    if ( control.value === '' || control.value.length >= 3 ) {
      return null;
    }
    return {
      sustValid: false
    };
  }
}
