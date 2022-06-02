import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './security/views/login/login.component';
import { LayoutComponent } from './core/views/layout/layout.component';
import { WelcomeComponent } from './core/views/welcome/welcome.component';
import { UserListComponent } from './management/views/user-list/user-list.component';
import { Role } from './core/models/Role';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'welcome', component: WelcomeComponent,  canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },  
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
