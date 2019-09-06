import { Injectable } from '@angular/core';
import { environment } from "@environment/environment";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "./interfaces/user";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = environment.apiUrl;
  private subject: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<User>(`${this.url}/api/v1/register`, user);
  }

  notify(data): void {
    this.subject.next(data);
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}
