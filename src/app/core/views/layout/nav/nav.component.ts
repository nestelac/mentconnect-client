import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    private auth: AuthService,
    private translate: TranslateService
  ) { 
  }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
    this.items = [
      {separator: true},
      {label: this.translate.instant('menu.assistance.title'), icon: PrimeIcons.USERS, visible: this.auth.hasRole([Role.Staff]),
        items:[
          {
            label:this.translate.instant('menu.assistance.discharge'),
            icon:'pi pi-fw pi-user-plus',
            routerLink: '/welcome'
          },
          {
            label: this.translate.instant('menu.assistance.patients'),
            icon:'pi pi-fw pi-users',
            routerLink: '/welcome'
          }
        ]
      },
      {label: this.translate.instant('menu.questionnaire'), icon: PrimeIcons.PENCIL, visible: this.auth.hasRole([Role.Staff])},
      {label: this.translate.instant('menu.schedule'), icon: PrimeIcons.CALENDAR, visible: this.auth.hasRole([Role.Staff])},
      {label: this.translate.instant('menu.management.title'), icon: PrimeIcons.COG, visible: this.auth.hasRole([]),
        items:[
          {
            label: this.translate.instant('menu.management.users'),
            icon:'pi pi-fw pi-users',
            routerLink: '/welcome'
          },
          {
            label: this.translate.instant('menu.management.estadistics'),
            icon:'pi pi-fw pi-chart-bar',
            routerLink: '/welcome'
          }
        ]
      },
      {label: this.translate.instant('menu.logOut'), icon: 'pi pi-sign-out', command: () => { this.logout(); }}
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
