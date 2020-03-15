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
          label: 'Nutrición',
          opciones: [
            { nombre: 'Caloria/s' },
            { nombre: 'Kilocaloria/s' }
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

export function iniciarDrops(form: FormGroup) {
        (((form.get('ingredientes') as FormArray).controls[0] as FormGroup).controls['unidades'] as FormControl).setValue(uds[0].opciones[0].nombre);
        (((form.get('ingredientes') as FormArray).controls[0] as FormGroup).controls['tipo'] as FormControl).setValue(tipos[0].nombre);
        (form.get('dificultad') as FormControl).setValue(dificultades[0].nombre);
        ((form.get('calorias') as FormGroup).controls['unidades'] as FormControl).setValue(uds[1].opciones[0].nombre);
}
