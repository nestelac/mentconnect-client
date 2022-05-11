import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

export function HttpLoeaderFactory(http : HttpClient)
{
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SecurityModule,
    MessagesModule,
    MessageModule,
    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader,
        useFactory : HttpLoeaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
