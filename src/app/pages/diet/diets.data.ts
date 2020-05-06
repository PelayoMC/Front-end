export const nombresComidas = ['Desayuno', 'Comida', 'Merienda', 'Cena'];
export const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export function label(nombre: string) {
        switch (nombre) {
          case 'Desayuno': return 'label label-success';
          case 'Comida': return 'label label-info';
          case 'Merienda': return 'label label-warning';
          case 'Cena': return 'label label-danger';
        }
      }