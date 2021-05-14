import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  get_person(personID): Observable<any>
  {
    const search_route_URL = 'https://secure-sorter-308001.wl.r.appspot.com/person/'+personID;
    return this.http.get(search_route_URL);
  }
}
