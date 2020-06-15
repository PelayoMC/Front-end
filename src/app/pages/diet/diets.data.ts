export const nombresComidas = ['comun.tabla.comidas.desayuno', 'comun.tabla.comidas.comida', 'comun.tabla.comidas.merienda', 'comun.tabla.comidas.cena'];
export const dias = ['comun.tabla.dias.lunes', 'comun.tabla.dias.martes', 'comun.tabla.dias.miercoles', 'comun.tabla.dias.jueves', 'comun.tabla.dias.viernes', 'comun.tabla.dias.sabado', 'comun.tabla.dias.domingo'];

export function label(nombre: string) {
        switch (nombre) {
          case 'comun.tabla.comidas.desayuno': return 'label label-success';
          case 'comun.tabla.comidas.comida': return 'label label-info';
          case 'comun.tabla.comidas.merienda': return 'label label-warning';
          case 'comun.tabla.comidas.cena': return 'label label-danger';
        }
      }