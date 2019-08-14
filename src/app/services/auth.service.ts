import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor() { }

  setAuthorizationToken(token: string) {
    this.token = token;
  }

  getAuthorizationToken() {
    return this.token;
  }
}
