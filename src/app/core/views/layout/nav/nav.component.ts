import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Role } from 'src/app/core/models/Role';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: MenuItem[];

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: "Asistencia", icon: 'pi pi-fw pi-image', routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: "Cuestionarios", icon: 'pi pi-fw pi-image', routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: "Agenda", icon: 'pi pi-fw pi-image', routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: "Gestión", icon: 'pi pi-fw pi-image', routerLink: '/welcome', visible: this.auth.hasRole([])}
      ];
  }

}
