export class Dieta {
        constructor(
            public dieta?: RecetaComent[],
            public admin?: string,
            public usuario?: string,
            public feedback?: string,
            public _id?: string
        ) {

        }
    }

interface RecetaComent {
    receta: string;
    comentario: string;
}
