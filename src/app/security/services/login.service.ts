import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

  login(username: string, password: string): Observable<ResponseCredentials> {

    this.auth.clearCredentials();

    return this.http.post<ResponseCredentials>(environment.server + '/security/login', {username: username, password: password});
  }
  
  putCredentials(res: ResponseCredentials) {
    this.auth.putTokenCredentials(res);
  }
  
}
