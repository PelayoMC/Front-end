export class Dieta {
        constructor(
            public dieta?: Receta[],
            public admin?: string,
            public usuario?: string,
            public _id?: string
        ) {

        }
    }

interface Receta {
    id: string;
    comentario: string;
}
