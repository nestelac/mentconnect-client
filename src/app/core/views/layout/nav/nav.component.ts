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
      {label: this.translate.instant('menu.assistance'), icon: PrimeIcons.USERS, routerLink: '/patient-discharge', visible: this.auth.hasRole([Role.Staff])},
      {label: this.translate.instant('menu.questionnaire'), icon: PrimeIcons.PENCIL, routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: this.translate.instant('menu.schedule'), icon: PrimeIcons.CALENDAR, routerLink: '/welcome', visible: this.auth.hasRole([Role.Staff])},
      {label: this.translate.instant('menu.management'), icon: PrimeIcons.COG, routerLink: '/welcome', visible: this.auth.hasRole([])},
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
