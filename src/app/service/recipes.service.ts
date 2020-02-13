import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

constructor() { }

private recipes: Recipe[] = [
    {
      nombre : 'Ensalada con pollo',
      descripcion : 'Las ensaladas de pollo son una estupenda manera de comer un plato único, apetecible y nutricionalmente completo. ' +
                    'Ideal para llevarte en el táper a la oficina o para una deliciosa comida de verano. La mayoría de ensaladas de pollo se preparan ' +
                    'con la pechuga braseada y se le añaden brotes, verduritas, frutos secos o queso, y una vinagreta.',
      ingredientes : [
        {
          nombre: 'Pechugas de pollo',
          cantidad: 400,
          unidades: UNIDADES.g
        },
        {
          nombre: 'Puerro',
          cantidad: 1,
          unidades: UNIDADES.no
        },
        {
          nombre: 'Vino blanco',
          cantidad: 75,
          unidades: UNIDADES.ml
        },
        {
          nombre: 'Salsa de soja',
          cantidad: 60,
          unidades: UNIDADES.ml
        },
        {
          nombre: 'Miel',
          cantidad: 30,
          unidades: UNIDADES.ml
        },
        {
          nombre: 'Lechuga',
          cantidad: 200,
          unidades: UNIDADES.g
        },{
          nombre: 'Queso fresco',
          cantidad: 300,
          unidades: UNIDADES.g
        },
        {
          nombre: 'Uvas pasas',
          cantidad: 40,
          unidades: UNIDADES.g
        },
        {
          nombre: 'Piñones',
          cantidad: 25,
          unidades: UNIDADES.g
        },
        {
          nombre: 'Mostaza de dijon',
          cantidad: 15,
          unidades: UNIDADES.ml
        },
        {
          nombre: 'Vinagre de manzana',
          cantidad: 15,
          unidades: UNIDADES.ml
        },
        {
          nombre: 'Aceite',
          cantidad: null,
          unidades: UNIDADES.gusto
        },{
          nombre: 'Sal',
          cantidad: null,
          unidades: UNIDADES.gusto
        }
        ,{
          nombre: 'Pimienta',
          cantidad: null,
          unidades: UNIDADES.gusto
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Lavar las verduras',
        'Cortar las verduras',
        'Añadirlo todo en un bowl',
        'Añadir la miel, la soja y el vino blanco',
        'Aliñar al gusto'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    },
    {
      nombre : 'Comida',
      descripcion : 'Descripción pappapapa',
      ingredientes : [
        {
          nombre: 'Ingrediente',
          cantidad: 2,
          unidades: UNIDADES.g
        }
      ],
      imagen: 'assets/images/recipes/1.jpg',
      pasos: [
        'Calentar agua',
        'Enfriarla otra vez'
      ],
      calorias: {
        cantidad: 250,
        unidades: UNIDADES.kcal
      },
      nivel : NIVEL.f
    }
  ];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(idx: string): Recipe {
    return this.recipes[idx];
  }
}

export interface Recipe {
  nombre: string;
  descripcion: string;
  ingredientes: Ingredient[];
  imagen: string;
  pasos: string[];
  calorias: Calorias;
  nivel: NIVEL;
}

interface Ingredient {
  nombre: string;
  cantidad: number;
  unidades: UNIDADES;
}

interface Calorias {
  cantidad: number;
  unidades: UNIDADES;
}

enum UNIDADES {
  cal = 'cal',
  kcal = 'kcal',
  g = 'g',
  kg = 'kg',
  ml = 'ml',
  l = 'l',
  gusto = 'Al gusto',
  no = ''
}

enum NIVEL {
  mf = 'Muy facil',
  f = 'Facil',
  m = 'Intermedio',
  d = 'Dificil',
  md = 'Muy dificil'
}
