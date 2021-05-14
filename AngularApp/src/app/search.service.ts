import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  
  constructor(private http: HttpClient) { }

  searchbar_get(searchText): Observable<any>
  {
    const search_route_URL = 'https://secure-sorter-308001.wl.r.appspot.com/typeAhead/'+searchText;
    return this.http.get(search_route_URL);
  }
}
