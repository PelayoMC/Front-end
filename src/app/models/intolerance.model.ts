import { Ingredient } from '../service/recipes/recipes.service';

export class Intolerance {
        constructor(
            public nombre: string,
            public ingredientes: Ingredient[],
            public _id?: string
        ) {

        }
    }
