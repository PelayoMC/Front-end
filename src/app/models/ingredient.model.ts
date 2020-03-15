import { Usuario } from './usuario.model';
export class Ingredient {
        constructor(
            public nombre: string,
            public tipo: string,
            public ingredienteSustituible: Ingredient,
            public creador: Usuario,
            public _id?: string
        ) {

        }
    }
