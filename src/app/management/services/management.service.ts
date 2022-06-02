import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { UserPage } from '../models/UserPage';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(pageable: Pageable): Observable<UserPage> {
    return this.http.post<UserPage>('http://localhost:8080/user-list', {pageable:pageable});
  }

  saveUsers(user: User): Observable<void> {
    let url = 'http://localhost:8080/user-list';
    if (user.id != null) url += '/'+user.id;

    return this.http.put<void>(url, user);
  }
}
