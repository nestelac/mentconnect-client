import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './views/user-list/user-list.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
  ]
})
export class ManagementModule { }
