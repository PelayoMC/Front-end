export const nombresComidas = ['comun.tabla.comidas.desayuno', 'comun.tabla.comidas.comida', 'comun.tabla.comidas.merienda', 'comun.tabla.comidas.cena'];
export const dias = ['comun.tabla.dias.lunes', 'comun.tabla.dias.martes', 'comun.tabla.dias.miercoles', 'comun.tabla.dias.jueves', 'comun.tabla.dias.viernes', 'comun.tabla.dias.sabado', 'comun.tabla.dias.domingo'];

export function label(nombre: string) {
        switch (nombre) {
          case 'Desayuno': return 'label label-success';
          case 'Comida': return 'label label-info';
          case 'Merienda': return 'label label-warning';
          case 'Cena': return 'label label-danger';
        }
      }