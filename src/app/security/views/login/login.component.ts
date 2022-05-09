import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string;
  password: string;
  isloading : boolean = false;
  loginForm : FormGroup;
  constructor(    
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router,
    private formBuilder : FormBuilder,
    public translate : TranslateService
  ) { 
    this.translate.addLangs(['login/es', 'login/ca', 'login/en'])
    this.translate.setDefaultLang('login/en');
  }

  ngOnInit(): void {
    if(this.auth.getToken() != null){
      this.router.navigate(['welcome']);
    } else {
      this.loginForm = this.formBuilder.group
      ({

        user: ['', [Validators.required]],
        password: ['', [Validators.required]],

      });
    }
  }
  onLogin()
  {
    if(!this.loginForm.invalid)
    {
      this.isloading = false;
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
  onSetLanguage(iso : string)
  {
    this.translate.use(`login/${iso}`);
  }
}
