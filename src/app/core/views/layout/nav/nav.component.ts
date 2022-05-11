import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Role } from 'src/app/core/models/Role';
import { User } from '../../../models/User';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user : User | null = null;
  items: MenuItem[];

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
    this.items = [
      //{label: this.getName(), icon: PrimeIcons.USER, style: "font-size: 2em:color:green", routerLink: '/welcome', visible: this.auth.hasRole([])},
      {separator: true},
      {label: "Asistencia", icon: PrimeIcons.USERS, routerLink: '/patient-discharge', visible: this.auth.hasRole([Role.Staff])},
      {label: "Cuestionarios", icon: PrimeIcons.PENCIL, routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: "Agenda", icon: PrimeIcons.CALENDAR, routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: "Gestión", icon: PrimeIcons.COG, routerLink: '/welcome', visible: this.auth.hasRole([])},
      {label: "Logout", icon: 'pi pi-sign-out', command: () => { this.logout(); }}
      ];
  }

  getUserName() : string {
    if (this.user == null) return "";
    return this.user.username;
  }

  getName() : string {
    if (this.user == null) return "";
    return this.user.name + " " + this.user.surnames;
  }

  logout() {
    this.auth.logout();
  }
}
