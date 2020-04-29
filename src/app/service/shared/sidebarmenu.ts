export const menuNR: any = [
        {
          titulo: 'Alimentos',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'Recetas',
              submenu : [
                {
                  titulo: 'Lista de recetas',
                  url: '/recipes'
                }
              ]
            },
            {
              titulo: 'Ingredientes',
              submenu : [
                {
                  titulo: 'Lista de ingredientes',
                  url: '/ingredients'
                }
              ]
            },
            {
              titulo: 'Intolerancias',
              submenu : [
                {
                  titulo: 'Lista de intolerancias',
                  url: '/intolerances'
                }
              ]
            },
            {
              titulo: 'Etiquetas',
              submenu : [
                {
                  titulo: 'Lista de etiquetas',
                  url: '/tags'
                }
              ]
            }
          ]
        }
      ];

export const menuU: any = [
        {
          titulo: 'Dieta',
          icono: 'mdi mdi-heart-half-outline',
          submenu : [
            { titulo: 'Planificación de dieta', url: '/diet/planning/', id: true  },
            { titulo: 'Seguimiento de dieta', url: '/diet/tracking/', id: true  }
          ]
        },
        {
          titulo: 'Alimentos',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'Recetas',
              submenu : [
                {
                  titulo: 'Lista de recetas',
                  url: '/recipes'
                }
              ]
            },
            {
              titulo: 'Ingredientes',
              submenu : [
                {
                  titulo: 'Lista de ingredientes',
                  url: '/ingredients'
                }
              ]
            },
            {
              titulo: 'Intolerancias',
              submenu : [
                {
                  titulo: 'Lista de intolerancias',
                  url: '/intolerances'
                }
              ]
            },
            {
              titulo: 'Etiquetas',
              submenu : [
                {
                  titulo: 'Lista de etiquetas',
                  url: '/tags'
                }
              ]
            }
          ]
        }
      ];

export const menuA: any =
      [
        {
          titulo: 'Dieta',
          icono: 'mdi mdi-heart-half-outline',
          submenu : [
            { titulo: 'Gestionar dietas', url: '/diet/managing/', id: true }
          ]
        },
        {
          titulo: 'Alimentos',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'Recetas',
              submenu : [
                {
                  titulo: 'Lista de recetas',
                  url: '/recipes'
                },
                {
                  titulo: 'Añadir receta',
                  url: '/addRecipe'
                }
              ]
            },
            {
              titulo: 'Ingredientes',
              submenu : [
                {
                  titulo: 'Lista de ingredientes',
                  url: '/ingredients'
                }
              ]
            },
            {
              titulo: 'Intolerancias',
              submenu : [
                {
                  titulo: 'Lista de intolerancias',
                  url: '/intolerances'
                },
                {
                  titulo: 'Crear intolerancia',
                  url: '/addIntolerance'
                }
              ]
            },
            {
              titulo: 'Etiquetas',
              submenu : [
                {
                  titulo: 'Lista de etiquetas',
                  url: '/tags'
                }
              ]
            }
          ]
        },
        {
          titulo: 'Usuarios',
          icono: 'mdi mdi-account-circle',
          submenu : [
            { titulo: 'Lista de usuarios', url: '/users' }
          ]
        }
      ];
