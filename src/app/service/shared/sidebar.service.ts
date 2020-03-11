import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Dieta',
      icono: 'mdi mdi-heart-half-outline',
      auth: false,
      submenu : [
        { titulo: 'Planificación de dieta', auth: false, url: '/' },
        { titulo: 'Seguimiento de dieta', auth: false, url: '/' }
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
              auth: false,
              url: '/addRecipe'
            },
            {
              titulo: 'Gestionar recetas',
              auth: false,
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
              auth: false,
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
              auth: false,
              url: '/'
            }
          ]
        }
      ]
    }, {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-circle',
      auth: false,
      submenu : [
        { titulo: 'Lista de usuarios', auth: false, url: '/' },
        { titulo: 'Gestión de usuarios', auth: false, url: '/' }
      ]
    }
  ];

  constructor() { }
}
