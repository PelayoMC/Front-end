import { Injectable } from '@angular/core';
import { menuNR, menuU, menuA, menuUNo } from './sidebarmenu';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuNR: any = menuNR;
  menuU: any = menuU;
  menuA: any = menuA;
  menuUNo: any = menuUNo;

  constructor() { }
}
