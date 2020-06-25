import { Ingredient } from './ingredient.model';
import { Usuario } from './usuario.model';

export class Recipe {
    constructor(
        public nombre: string = '',
        public descripcion: string = '',
        public tipoRe: string = '',
        public imagen: string = '',
        public ingredientes: IngredientRecipe[] = [],
        public pasos: string[] = [],
        public nivel: string = '',
        public puntuacion?: number,
        public calorias: Calorias = null,
        public _id?: string
    ) {
    }
}

export interface IngredientRecipe extends Ingredient {
    cantidad: number;
    unidades: string;
    tipo: string;
    ingredienteSustituible: string;
}

interface Calorias {
    cantidad: number;
    unidades: string;
}

function label() {
    switch (this.tipoRe) {
      case 'Desayuno': return 'label label-success';
      case 'Comida': return 'label label-info';
      case 'Merienda': return 'label label-warning';
      case 'Cena': return 'label label-danger';
    }
  }

