export class Votacion {
        constructor(
            public receta?: string,
            public usuarios?: string[],
            public puntos?: number,
            public total?: number,
            public _id?: string
        ) {
        }
    }
