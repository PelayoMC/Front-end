export class Dieta {
        constructor(
            public dieta?: Receta[],
            public admin?: string,
            public usuario?: string,
            public feedback?: string,
            public _id?: string
        ) {

        }
    }

interface Receta {
    receta: string;
    comentario: string;
}
