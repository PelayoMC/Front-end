import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuNR: any = [
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
              url: '/'
            }
          ]
        },
        {
          titulo: 'Intolerancias',
          submenu : [
            {
              titulo: 'Lista de intolerancias',
              url: '/'
            }
          ]
        }
      ]
    }
  ];

  menuU: any = [
    {
      titulo: 'Dieta',
      icono: 'mdi mdi-heart-half-outline',
      submenu : [
        { titulo: 'Planificación de dieta', url: '/' },
        { titulo: 'Seguimiento de dieta', url: '/' }
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
              url: '/'
            }
          ]
        },
        {
          titulo: 'Intolerancias',
          submenu : [
            {
              titulo: 'Lista de intolerancias',
              url: '/'
            }
          ]
        }
      ]
    }
  ];

  menuA: any = [
    {
      titulo: 'Dieta',
      icono: 'mdi mdi-heart-half-outline',
      submenu : [
        { titulo: 'Planificación de dieta', url: '/' },
        { titulo: 'Seguimiento de dieta', url: '/' }
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
            },
            {
              titulo: 'Gestionar recetas',
              url: '/'
            }
          ]
        },
        {
          titulo: 'Ingredientes',
          submenu : [
            {
              titulo: 'Lista de ingredientes',
              url: '/'
            },
            {
              titulo: 'Gestionar ingredientes',
              url: '/'
            }
          ]
        },
        {
          titulo: 'Intolerancias',
          submenu : [
            {
              titulo: 'Lista de intolerancias',
              url: '/'
            },
            {
              titulo: 'Gestionar intolerancias',
              url: '/'
            }
          ]
        }
      ]
    }, {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-circle',
      submenu : [
        { titulo: 'Lista de usuarios', url: '/users' },
        { titulo: 'Gestión de usuarios', url: '/' }
      ]
    }
  ];

  constructor() { }
}
