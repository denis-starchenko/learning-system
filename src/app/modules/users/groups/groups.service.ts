import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get(`${this.url}/api/v1/groups`);
  }
}
