import { Ingredient } from './ingredient.model';

export class Intolerance {
        constructor(
            public nombre?: string,
            public descripcion?: string,
            public noApto?: string[],
            public _id?: string
        ) { }
    }
