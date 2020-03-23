import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Dieta',
      icono: 'mdi mdi-heart-half-outline',
      auth: true,
      submenu : [
        { titulo: 'Planificación de dieta', auth: true, url: '/' },
        { titulo: 'Seguimiento de dieta', auth: true, url: '/' }
      ]
    },
    {
      titulo: 'Alimentos',
      icono: 'mdi mdi-food',
      auth: false,
      submenu : [
        {
          titulo: 'Recetas',
          auth: false,
          submenu : [
            {
              titulo: 'Lista de recetas',
              auth: false,
              url: '/recipes'
            },
            {
              titulo: 'Añadir receta',
              auth: true,
              url: '/addRecipe'
            },
            {
              titulo: 'Gestionar recetas',
              auth: true,
              url: '/'
            }
          ]
        },
        {
          titulo: 'Ingredientes',
          auth: false,
          submenu : [
            {
              titulo: 'Lista de ingredientes',
              auth: false,
              url: '/'
            },
            {
              titulo: 'Gestionar ingredientes',
              auth: true,
              url: '/'
            }
          ]
        },
        {
          titulo: 'Intolerancias',
          auth: false,
          submenu : [
            {
              titulo: 'Lista de intolerancias',
              auth: false,
              url: '/'
            },
            {
              titulo: 'Gestionar intolerancias',
              auth: true,
              url: '/'
            }
          ]
        }
      ]
    }, {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-circle',
      auth: true,
      submenu : [
        { titulo: 'Lista de usuarios', auth: true, url: '/users' },
        { titulo: 'Gestión de usuarios', auth: true, url: '/' }
      ]
    }
  ];

  constructor() { }
}
