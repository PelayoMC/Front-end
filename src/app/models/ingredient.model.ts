export class Ingredient {
        constructor(
            public nombre: string = '',
            public ingredienteSustituible: Ingredient = null,
            public _id?: string
        ) {

        }
    }
