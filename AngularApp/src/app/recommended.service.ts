import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {

  constructor(private http: HttpClient) { }

  get_recommendations(params): Observable<any>
  {
    const search_route_URL = 'https://secure-sorter-308001.wl.r.appspot.com/individual/' + params;
    return this.http.get(search_route_URL);
  }
}
