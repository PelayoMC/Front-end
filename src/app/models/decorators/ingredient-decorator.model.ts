import { Ingredient } from '../ingredient.model';
export class IngredienteDecorator {
        constructor(
            public ingrediente: Ingredient,
            public modificando: boolean
        ) {
        }
    }
