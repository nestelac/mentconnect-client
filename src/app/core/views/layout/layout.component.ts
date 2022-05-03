import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  visibleSideBar = false;

  constructor(
    private auth: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserDetails();
  }

  private checkUserDetails() : void {
    let user = this.auth.getUserInfo();

    if (user == null || user.username == null) {
      this.auth.clearCredentials();
      this.router.navigate(['login']);
    }
  }

  public toggleMenu() : void {
    this.visibleSideBar = !this.visibleSideBar;
  }

}
