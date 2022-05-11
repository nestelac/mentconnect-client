import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  routeTranslate = 'security/login/';
  titleErrorKey = 'login.form.credentialError.title';
  detailErrorKey = "login.form.credentialError.detail";
  user: string = "";
  password: string = "";
  isloading : boolean = false;

  constructor(    
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router,
    public translate : CustomTranslateService,
    private mesaageService: MessageService
  ) { 
    this.translate.setRoute(this.routeTranslate)
  }

  ngOnInit(): void {
    if(this.auth.getToken() != null){
      this.router.navigate(['welcome']);
    } 
  }
  onLogin(){

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
        this.showMessageError();
        this.isloading = false;
      }
    );

  }
  onSetLanguage(code: string){
    this.translate.setLang(code);
  }
  showMessageError(){
    this.mesaageService.add({key: 'credentialError', severity:'error', summary: this.translate.translateKey(this.titleErrorKey), detail: this.translate.translateKey(this.detailErrorKey)});
  }
}
