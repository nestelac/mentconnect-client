import { TranslateLoader } from '@ngx-translate/core';
import {Observable, forkJoin, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import * as merge from 'deepmerge';
import { HttpClient } from '@angular/common/http';


export class TranslateHttpLoader implements TranslateLoader {

  constructor(
    private http: HttpClient,
    private root: string,
    private resources: string[],
  ) {}

  public getTranslation(lang: string): Observable<any> {

    const requests = this.resources.map(resource => {
      const path = this.root + resource + "/" + lang + ".json";
      return this.http.get(path).pipe(catchError(res => {
        console.error("Something went wrong for the following translation file:", path);
        return of({});
      }));
    });
    return forkJoin(requests).pipe(map(response => merge.all(response)));
  }
}
