import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  private localstore_length: BehaviorSubject<boolean>;
  isEmpty;

  constructor() 
  {
    this.localstore_length = new BehaviorSubject<boolean>(true);
    //this.isEmpty = this.localstore_length.asObservable();
    this.isEmpty = new BehaviorSubject<boolean>(true);
  }

  set_storage_empty(newValue): void
  {
    this.isEmpty.next(newValue);
  }

  get_storage_empty(): Observable<boolean>
  {
    return this.isEmpty.asObservable();
  }
}
