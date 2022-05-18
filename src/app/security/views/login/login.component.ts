import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  titleErrorKey = 'login.form.credentialError.title';
  detailErrorKey = "login.form.credentialError.detail";
  user: string = "";
  password: string = "";
  isloading : boolean = false;
  languages = [{label: "English", code: "en"},
              {label: "Español", code: "es"},
              {label: "Valencià", code: "ca"}];

  selectedLangCode: string;

  constructor(    
    private loginService: LoginService,
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    private mesaageService: MessageService
  ) {
    this.selectedLangCode = translate.currentLang;
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

  onLangChange(){
    this.translate.use(this.selectedLangCode);
  }

  showMessageError(){
    this.mesaageService.add({key: 'credentialError', severity:'error', summary: this.translate.instant(this.titleErrorKey), detail: this.translate.instant(this.detailErrorKey)});
  }
}
