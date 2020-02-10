import { Injectable } from '@angular/core';
import { IngredientsService, Ingredient, UNIDADES } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

constructor(private ingredient_service: IngredientsService) { }

private recipes: Recipe[] = [
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
}
