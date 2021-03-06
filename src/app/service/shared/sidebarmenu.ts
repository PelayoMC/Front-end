export const menuNR: any = [
        {
          titulo: 'sidebar.alimentos.titulo',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'sidebar.alimentos.recetas.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.recetas.lista',
                  url: '/recipes'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.intolerancias.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.intolerancias.lista',
                  url: '/intolerances'
                }
              ]
            }
          ]
        }
      ];

export const menuUNo: any = [
        {
          titulo: 'sidebar.dieta.titulo',
          icono: 'mdi mdi-heart-half-outline',
          submenu : [
            { titulo: 'sidebar.dieta.solicitar', url: '/diet/soliciting/' }
          ]
        },
        {
          titulo: 'sidebar.alimentos.titulo',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'sidebar.alimentos.recetas.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.recetas.lista',
                  url: '/recipes'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.intolerancias.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.intolerancias.lista',
                  url: '/intolerances'
                }
              ]
            }
          ]
        }
      ];

export const menuU: any = [
        {
          titulo: 'sidebar.dieta.titulo',
          icono: 'mdi mdi-heart-half-outline',
          submenu : [
            { titulo: 'sidebar.dieta.planificar', url: '/diet/planning/' },
            { titulo: 'sidebar.dieta.seguimiento', url: '/diet/tracking/' }
          ]
        },
        {
          titulo: 'sidebar.alimentos.titulo',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'sidebar.alimentos.recetas.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.recetas.lista',
                  url: '/recipes'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.intolerancias.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.intolerancias.lista',
                  url: '/intolerances'
                }
              ]
            }
          ]
        }
      ];

export const menuA: any =
      [
        {
          titulo: 'sidebar.dieta.titulo',
          icono: 'mdi mdi-heart-half-outline',
          submenu : [
            { titulo: 'sidebar.dieta.gestion', url: '/diet/managing/' }
          ]
        },
        {
          titulo: 'sidebar.alimentos.titulo',
          icono: 'mdi mdi-food',
          submenu : [
            {
              titulo: 'sidebar.alimentos.recetas.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.recetas.lista',
                  url: '/recipes'
                },
                {
                  titulo: 'sidebar.alimentos.recetas.añadir',
                  url: '/addRecipe'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.ingredientes.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.ingredientes.lista',
                  url: '/ingredients'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.intolerancias.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.intolerancias.lista',
                  url: '/intolerances'
                },
                {
                  titulo: 'sidebar.alimentos.intolerancias.añadir',
                  url: '/addIntolerance'
                }
              ]
            },
            {
              titulo: 'sidebar.alimentos.etiquetas.titulo',
              submenu : [
                {
                  titulo: 'sidebar.alimentos.etiquetas.lista',
                  url: '/tags'
                }
              ]
            }
          ]
        },
        {
          titulo: 'sidebar.usuarios.titulo',
          icono: 'mdi mdi-account-circle',
          submenu : [
            { titulo: 'sidebar.usuarios.lista', url: '/users' }
          ]
        }
      ];
