import {TestBed} from '@angular/core/testing';
import {LoginService} from './login.service';
import {HttpClientModule} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {User} from "./interfaces/user";
import {of, Subject} from "rxjs";

describe('LoginService', () => {
  let loginServiceSpy = null;
  let authServiceSpy = null;
  let subject: Subject<any>;
  let user: User = {
    login: 'login',
    password: 'password',
    token: 'token'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      {provide: 'LoginService', useValue: loginServiceSpy},
      {provide: 'AuthService', useValue: authServiceSpy},
    ]
  }));

  beforeEach(() => {
    subject = new Subject();
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login', 'notify', 'getObservable']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setAuthorizationToken']);
    loginServiceSpy.login.and.returnValue(of(user));
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should have login method', function () {
      expect(loginServiceSpy.login).toBeDefined();
    });

    it('should invoke the method login', function () {
      loginServiceSpy.login();
      expect(loginServiceSpy.login).toHaveBeenCalled();
    });

    it('should return a user', () => {
      loginServiceSpy.login().subscribe(userData => {
        expect(userData).toEqual(user);
      });
    });
  });

  describe('#notify', () => {
    it('should have notify method', function () {
      expect(loginServiceSpy.notify).toBeDefined();
    });

    it('should invoke the method notify', function () {
      loginServiceSpy.notify();
      expect(loginServiceSpy.notify).toHaveBeenCalled();
    });

    it('Method setAuthorizationToken should be called', function () {
      loginServiceSpy.notify.and.callFake(function (user) {
        authServiceSpy.setAuthorizationToken(user.token);
        expect(authServiceSpy.setAuthorizationToken).toHaveBeenCalled();
      });
    });

    it('Method next should be called', function () {
      loginServiceSpy.notify.and.callFake(function (user) {
        subject.next(user);
        expect(subject.next(user)).toHaveBeenCalled();
      });
    });
  });

  describe('#getObservable', () => {
    it('should have getObservable method', function () {
      expect(loginServiceSpy.getObservable).toBeDefined();
    });

    it('should invoke the method getObservable', function () {
      loginServiceSpy.getObservable();
      expect(loginServiceSpy.getObservable).toHaveBeenCalled();
    });

    it('should return observable', function () {
      loginServiceSpy.getObservable.and.returnValue(of(subject.asObservable));
      loginServiceSpy.getObservable().subscribe(data => {
        expect(data).toBe(subject.asObservable);
      })
    });
  });
});
