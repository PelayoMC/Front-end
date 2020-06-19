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
        public sexo?: string,
        public edad?: number,
        public altura?: number,
        public peso?: number,
        public ejercicio?: number,
        public observaciones?: string,
        public notificaciones?: Notificacion[],
        public _id?: string
    ) {

    }
}

interface Notificacion {
    titulo: string;
    mensaje: string;
}

