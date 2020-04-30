export class Usuario {
    constructor(
        public nombre?: string,
        public email?: string,
        public contraseña?: string,
        public imagen?: string,
        public rol?: string,
        public google?: boolean,
        public dieta?: string,
        public recetasFavoritas?: string[],
        public misIntolerancias?: string[],
        public edad?: number,
        public altura?: number,
        public peso?: number,
        public _id?: string
    ) {

    }
}
