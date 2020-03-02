export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public contraseña: string,
        public imagen?: string,
        public rol?: string,
        public google?: boolean,
        public _id?: string
    ) {

    }
}
