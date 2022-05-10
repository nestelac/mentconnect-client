import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {

  private route: string;

  constructor(private translate: TranslateService) { }

  public setRoute(route : string){
    this.route = route;
    let currentLang = this.translate.currentLang
    if(currentLang){
      this.setLang(currentLang.slice(-2))
    }
    else
      this.setLang('en');
  }

  public setLang(lang : string){
    this.translate.use(this.route + lang);
  }
  
  public translateKey(key : string)
  {
    return this.translate.instant(key);
  }
}
