import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
//import { User } from '../../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  loading: boolean;
  pageNumber: number = 0;
  pageSize: number = 25;
  property: string= 'id';
  direction: string= 'asc';
  users: string;
  totalElements: number = 0;
  //users: User[];

  constructor() { }

  ngOnInit(): void {
  }

  loadPage(event?: LazyLoadEvent){

    this.loading = true;

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: this.property,
            direction: this.direction,
        }]
    }
    
    if (event != null) {
        pageable.pageSize = event.rows;
        pageable.pageNumber = event.first/event.rows;
        if(event.sortField != null)
          pageable.sort = [{property: event.sortField, direction: event.sortOrder == 1? "asc": "desc"}];
    }

    /*
    this.estimationService.getEstimations(pageable, this.customerId, this.projectName, this.startDate, this.endDate).subscribe(data => {
        this.estimations = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
        this.loading = false; 
    });
    */
  }

}
