import { Ingredient } from './ingredient.model';
import { Usuario } from './usuario.model';

export class Recipe {
    constructor(
        public nombre: string = '',
        public descripcion: string = '',
        public nivel: string = '',
        public imagen: string = '',
        public ingredientes: IngredientRecipe[] = [],
        public calorias: Calorias = null,
        public pasos: string[] = [],
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

