import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }
}

export interface Ingredient {
  nombre: string;
  cantidad: number;
  unidades: UNIDADES;
}

export enum UNIDADES {
  g,
  kg,
  ml,
  l
}
