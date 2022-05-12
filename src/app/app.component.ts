import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(    
    public translate: TranslateService,
  ) {     

    let navigatorLocale = navigator.language.substring(0,2);

    if (this.localeNotSupported(navigatorLocale)) 
      navigatorLocale = 'en';

    translate.use(navigatorLocale);
  }


  private localeNotSupported(locale : string) : boolean {
    
    if (locale == 'es') return false;
    if (locale == 'en') return false;
    if (locale == 'ca') return false;

    return true;
  }
}
