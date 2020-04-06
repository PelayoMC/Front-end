import { Usuario } from '../usuario.model';
export class UsuarioDecorator {
        constructor(
            public usuario: Usuario,
            public modificando: boolean
        ) {
        }
    }
