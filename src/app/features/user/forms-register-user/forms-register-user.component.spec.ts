import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRegisterUserComponent } from './forms-register-user.component';

describe('FormsRegisterUserComponent', () => {
  let component: FormsRegisterUserComponent;
  let fixture: ComponentFixture<FormsRegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsRegisterUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
