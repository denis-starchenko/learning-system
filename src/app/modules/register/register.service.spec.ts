import {TestBed} from '@angular/core/testing';
import {RegisterService} from './register.service';
import {HttpClientModule} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, Subject} from "rxjs";
import {User} from "./interfaces/user";

describe('RegisterService', () => {
  let user: User;
  let regServiceSpy = null;
  let subject: Subject<any>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
      {provide: 'RegisterService', useValue: regServiceSpy}
    ]
  }));

  beforeEach(() => {
    subject = new Subject();
    regServiceSpy = jasmine.createSpyObj('RegisterService', ['register', 'notify', 'getObservable']);
    regServiceSpy.register.and.returnValue(of(user));
    regServiceSpy.getObservable.and.returnValue(of(subject.asObservable));
  })

  it('should be created', () => {
    const service: RegisterService = TestBed.get(RegisterService);
    expect(service).toBeTruthy();
  });

  describe('#register', () => {
    it('should have register method', function () {
      expect(regServiceSpy.register).toBeDefined();
    });

    it('should invoke the method register', function () {
      regServiceSpy.register();
      expect(regServiceSpy.register).toHaveBeenCalled();
    });

    it('should return a user', () => {
      regServiceSpy.register().subscribe(userData => {
        expect(userData).toEqual(user);
      });
    });
  });

  describe('#notify', () => {
    it('should have notify method', function () {
      expect(regServiceSpy.notify).toBeDefined();
    });

    it('should invoke the method notify', function () {
      regServiceSpy.notify();
      expect(regServiceSpy.notify).toHaveBeenCalled();
    });

    it('should notify observers', function () {
      regServiceSpy.notify.and.callFake(function (user) {
        subject.next(user);
        expect(subject.next).toHaveBeenCalled();
      });
    });
  });

  describe('#getObservable', () => {
    it('should have getObservable method', function () {
      expect(regServiceSpy.getObservable).toBeDefined();
    });

    it('should invoke the method getObservable', function () {
      regServiceSpy.getObservable();
      expect(regServiceSpy.getObservable).toHaveBeenCalled();
    });

    it('should return observable', function () {
      regServiceSpy.getObservable().subscribe(data => {
        expect(data).toBe(subject.asObservable);
      });
    });
  });
});
