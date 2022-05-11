import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-patient-discharge',
  templateUrl: './patient-discharge.component.html',
  styleUrls: ['./patient-discharge.component.scss']
})
export class PatientDischargeComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
    
  home: MenuItem;
  
  ngOnInit() {
      this.items = [
          {label: 'Asistencia'},
          {label: 'Vinculación'}
      ];
      
      this.home = {icon: 'pi pi-home'};
  }

}
