import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { UsersService } from '../../service/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit() {
  }

}
