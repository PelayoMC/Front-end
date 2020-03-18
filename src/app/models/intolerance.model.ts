import { Ingredient } from './ingredient.model';

export class Intolerance {
        constructor(
            public nombre: string,
            public ingredientes: Ingredient[],
            public _id?: string
        ) { }
    }
