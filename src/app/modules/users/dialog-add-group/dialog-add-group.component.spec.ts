import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddGroupComponent } from './dialog-add-group.component';

describe('DialogAddGroupComponent', () => {
  let component: DialogAddGroupComponent;
  let fixture: ComponentFixture<DialogAddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
