import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";


@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserStatus() {
    return this.http.get(`${this.url}/api/v1/status`);
  }
}
