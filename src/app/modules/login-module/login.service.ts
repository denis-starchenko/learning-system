import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from "../../../environments/environment";
import { User } from "./interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private subject = new Subject();

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.http.post<User>(this.url, user)
      .subscribe(response => this.subject.next(response));
  }

  getUserData(): Observable<any> {
    return this.subject.asObservable();
  }
}
