import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new Subject();
  private token: string;

  constructor(store: Store<{ token: string }>) {
    store
      .pipe(
        select('login'),
        filter(login => login && login.token)
      )
      .subscribe(login => this.notify(login.token));
  }

  setAuthorizationToken(token: string) {
    this.token = token;
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
