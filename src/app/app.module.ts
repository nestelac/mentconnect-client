import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './security/security.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TranslateHttpLoader } from './core/utils/translate-http-loader';
import { PatientDischargeComponent } from './assistance/views/patient-discharge/patient-discharge.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", [
      "security/login",
      "core/layout/menu",
      "core/layout/welcome"
  ]);
}


@NgModule({
  declarations: [
    AppComponent,
    PatientDischargeComponent
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
        useFactory : HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
