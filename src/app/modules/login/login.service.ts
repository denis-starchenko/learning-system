import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from "@environment/environment";
import { User } from "./interfaces/user";
import { AuthService } from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private subject = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(user) {
    return this.http.post<User>(`${this.url}/api/v1/login`, user);
  }

  notify(user): void {
    this.authService.setAuthorizationToken(user.token);
    this.subject.next(user);
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}
