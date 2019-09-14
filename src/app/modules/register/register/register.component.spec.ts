import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterComponent} from './register.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {User} from "../interfaces/user";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let regServiceSpy = null;
  let user: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: 'RegisterService', useValue: regServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    regServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    let component = jasmine.createSpyObj('RegisterComponent', ['createForm']);

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Method createForm should be called', function () {
      component.createForm();
      expect(component.createForm).toHaveBeenCalled();
    });
  });

  describe('#onSubmit', () => {
    it('should have register method', function () {
      expect(regServiceSpy.register).toBeDefined();
    });

    it('should invoke the method register', function () {
      regServiceSpy.register();
      expect(regServiceSpy.register).toHaveBeenCalled();
    });

    it('should accept user object', function () {
      regServiceSpy.register(user);
      expect(regServiceSpy.register).toHaveBeenCalledWith(user);
    });
  });

  describe('#createForm', function () {
    it('login should be invalid', function () {
      component.getControl('login').setValue('');
      expect(component.getControl('login').valid).toBeFalsy();
    });

    it('firstName should be invalid', function () {
      component.getControl('firstName').setValue('');
      expect(component.getControl('firstName').valid).toBeFalsy();
    });

    it('lastName should be invalid', function () {
      component.getControl('lastName').setValue('');
      expect(component.getControl('lastName').valid).toBeFalsy();
    });

    it('password should be invalid', function () {
      component.getControl('password').setValue('');
      expect(component.getControl('password').valid).toBeFalsy();
    });

    it('login should be valid', function () {
      component.getControl('login').setValue('user@mail.com');
      expect(component.getControl('login').valid).toBeTruthy();
    });

    it('firstName should be valid', function () {
      component.getControl('firstName').setValue('firstName');
      expect(component.getControl('firstName').valid).toBeTruthy();
    });

    it('lastName should be valid', function () {
      component.getControl('lastName').setValue('lastName');
      expect(component.getControl('lastName').valid).toBeTruthy();
    });

    it('password should be valid', function () {
      component.getControl('password').setValue('Mnj!13j69');
      expect(component.getControl('password').valid).toBeTruthy();
    });

    it('confirmPassword should be valid', function () {
      component.getControl('password').setValue('Mnj!13j69');
      component.getControl('confirmPassword').setValue('Mnj!13j69');
      expect(component.getControl('confirmPassword').valid).toBeTruthy();
    });
  });
});
