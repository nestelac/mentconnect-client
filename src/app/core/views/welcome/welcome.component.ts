import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from '../../services/custom-translate.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  routeTranslate = 'security/welcome/';

  constructor(
    public translate : CustomTranslateService
  ) { 
    this.translate.setRoute(this.routeTranslate)
  }

  ngOnInit(): void {
  }

}
