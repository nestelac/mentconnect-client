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
  user: string = "admin";
  password: string = "d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1";
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
      this.login(); //TODO esto fuera
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
