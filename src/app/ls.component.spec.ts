import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LsComponent } from './ls.component';

describe('LsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'learning-system'`, () => {
    const fixture = TestBed.createComponent(LsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('learning-system');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(LsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to learning-system!');
  });
});
