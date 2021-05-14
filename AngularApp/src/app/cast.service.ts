import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(private http: HttpClient) { }

  get_cast(params): Observable<any>
  {
    const search_route_URL = 'https://secure-sorter-308001.wl.r.appspot.com/cast'+params;
    return this.http.get(search_route_URL);
  }
}
