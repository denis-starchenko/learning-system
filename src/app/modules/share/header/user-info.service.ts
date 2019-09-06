import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get(`${this.url}/api/v1/status`);
  }
}
