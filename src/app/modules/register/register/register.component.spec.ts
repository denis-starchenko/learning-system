import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { User } from "../interfaces/user";

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have register method', function() {
    expect(regServiceSpy.register).toBeDefined();
  });

  it('should invoke the method register', function() {
    regServiceSpy.register();
    expect(regServiceSpy.register).toHaveBeenCalled();
  });

  it('should accept user object', function() {
    regServiceSpy.register(user);
    expect(regServiceSpy.register).toHaveBeenCalledWith(user);
  });

  it('form should be invalid', function() {
    component.getControl('login').setValue('');
    component.getControl('firstName').setValue('');
    component.getControl('lastName').setValue('');
    component.getControl('password').setValue('');

    expect(component.getControl('login').valid).toBeFalsy();
    expect(component.getControl('firstName').valid).toBeFalsy();
    expect(component.getControl('lastName').valid).toBeFalsy();
    expect(component.getControl('password').valid).toBeFalsy();
  });

  it('form should be valid', function() {
    component.getControl('login').setValue('user@mail.com');
    component.getControl('firstName').setValue('firstName');
    component.getControl('lastName').setValue('lastName');
    component.getControl('password').setValue('Mnj!13j69');
    component.getControl('confirmPassword').setValue('Mnj!13j69');

    expect(component.getControl('login').valid).toBeTruthy();
    expect(component.getControl('firstName').valid).toBeTruthy();
    expect(component.getControl('lastName').valid).toBeTruthy();
    expect(component.getControl('password').valid).toBeTruthy();
    expect(component.getControl('confirmPassword').valid).toBeTruthy();
  });
});
