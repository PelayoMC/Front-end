export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public contraseña: string,
        public imagen?: string,
        public rol?: string,
        public google?: boolean,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) {

    }
}
