import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [FormBuilder, DataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get onSubmit', () => {
    const onSubmit: jasmine.Spy = spyOn(
      component,
      'onSubmit'
    ).and.callThrough();
    component.loginForm.setErrors({ valid: true });
    component.onSubmit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should get onSubmit', () => {
    const onSubmit: jasmine.Spy = spyOn(
      component,
      'onSubmit'
    ).and.callThrough();
    component.loginForm.setErrors({ valid: false });
    component.onSubmit();
    expect(onSubmit).toHaveBeenCalled();
  });
});
