import { FormArray, FormGroup, FormControl } from '@angular/forms';

export const uds = [
        {
          label: 'Generales',
          opciones: [
            { nombre: 'Sin unidades' },
            { nombre: 'Al gusto' },
            { nombre: 'Cucharadita/s' },
            { nombre: 'Cucharada/s' },
            { nombre: 'Taza/s' }
          ]
        },
        {
          label: 'Peso',
          opciones: [
            { nombre: 'Gramo/s' },
            { nombre: 'Kilogramo/s' }
          ]
        },
        {
          label: 'Volumen',
          opciones: [
            { nombre: 'Mililitro/s' },
            { nombre: 'Litro/s' }
          ]
        }
      ];

export const tipos = [
        { nombre: 'Principal' },
        { nombre: 'Secundario' }
      ];

export const dificultades = [
        { nombre: 'Facil' },
        { nombre: 'Medio' },
        { nombre: 'Difícil' }
      ];

export const nutricion = [
    { nombre: 'Caloria/s' },
    { nombre: 'Kilocaloria/s' }
];


