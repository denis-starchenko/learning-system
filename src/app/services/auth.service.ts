import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import {select, Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new Subject();
  private token: string;
  private store;

  constructor(store: Store<{ token: string }>) {
    this.store = store.pipe(select('token'));
  }

  setAuthorizationToken(token: string) {
    this.token = token;
    this.notify(token);
  }

  getAuthorizationToken() {
    return this.token;
  }

  notify(token): void {
    this.subject.next(token);
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}
