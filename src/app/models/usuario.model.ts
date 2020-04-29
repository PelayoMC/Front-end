export class Usuario {
    constructor(
        public nombre?: string,
        public email?: string,
        public contraseña?: string,
        public imagen?: string,
        public rol?: string,
        public google?: boolean,
        public recetasFavoritas?: string[],
        public misIntolerancias?: string[],
        public edad?: number,
        public altura?: number,
        public peso?: number,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {

    }
}
