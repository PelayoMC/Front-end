import { Ingredient } from './ingredient.model';
import { Usuario } from './usuario.model';

export class Recipe {
        constructor(
            public nombre: string,
            public descripcion: string,
            public nivel: string,
            public imagen: string,
            public ingredientes: Ingredient[],
            public calorias: Calorias,
            public pasos: string[],
            public creador: Usuario,
            public _id?: string
        ) {

        }
    }

interface Calorias {
        cantidad: number;
        unidades: string;
}
