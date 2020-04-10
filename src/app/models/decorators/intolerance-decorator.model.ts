import { Intolerance } from '../intolerance.model';
export class IntoleranceDecorator {
        constructor(
            public intolerancia: Intolerance,
            public modificando: boolean
        ) {
        }
    }
