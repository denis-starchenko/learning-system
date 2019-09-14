import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginService} from "../login.service";
import {Subject, of} from "rxjs";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy = null;

  const user = {
    login: 'login',
    password: 'password'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: 'LoginService', useValue: loginServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginServiceSpy.login.and.returnValue(of(user));
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#onSubmit', () => {
    it('should have login method', function () {
      expect(loginServiceSpy.login).toBeDefined();
    });

    it('should invoke the method login', function () {
      loginServiceSpy.login();
      expect(loginServiceSpy.login).toHaveBeenCalled();
    });

    it('should accept user object', function () {
      loginServiceSpy.login(user);
      expect(loginServiceSpy.login).toHaveBeenCalledWith(user);
    });
  });

  describe('#createForm', () => {
    it('login should be invalid', function () {
      component.getControl('login').setValue('');
      expect(component.getControl('login').valid).toBeFalsy();
    });

    it('password should be invalid', function () {
      component.getControl('password').setValue('');
      expect(component.getControl('password').valid).toBeFalsy();
    });

    it('login should be valid', function () {
      component.getControl('login').setValue('user');
      expect(component.getControl('login').valid).toBeTruthy();
    });

    it('password should be valid', function () {
      component.getControl('password').setValue('password');
      expect(component.getControl('password').valid).toBeTruthy();
    });
  });

  describe('#ngOnDestroy', () => {
    let subscription = jasmine.createSpyObj('Subject', ['next', 'complete']);

    it('Method next should be called', function () {
      subscription.next();
      expect(subscription.next).toHaveBeenCalled();
    });

    it('Method complete should be called', function () {
      subscription.complete();
      expect(subscription.complete).toHaveBeenCalled();
    });
  });
});
