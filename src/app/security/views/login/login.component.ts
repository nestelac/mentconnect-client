import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //TODO modificar todo
  user: string = "staff";
  password: string = "1a1dc91c907325c69271ddf0c944bc72";
  isloading : boolean = false;

  constructor(    
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.auth.getToken() != null){
      this.router.navigate(['welcome']);
    } else {
      this.login();
    }
  }

  login() {
    if (this.user == "") return;
    if (this.password == "") return;

    this.isloading = true;

    this.loginService.login(this.user, this.password).subscribe(
      (res: ResponseCredentials) => {
        this.loginService.putCredentials(res);

        this.router.navigate(['welcome']);
        this.isloading = false;
      },
      (err: any) => {
        this.isloading = false;
      }
    );
  }

}
