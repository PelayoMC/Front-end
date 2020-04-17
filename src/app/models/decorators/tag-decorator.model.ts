import { Etiqueta } from '../etiqueta.model';
export class EtiquetaDecorator {
        constructor(
            public etiqueta: Etiqueta,
            public modificando: boolean
        ) {
        }
    }
