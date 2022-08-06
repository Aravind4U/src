import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from '../services/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [DataService],
    }).compileComponents();
  }));

  beforeEach(() => {
    const role = 'admin';
    localStorage.user = JSON.stringify(role);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    const users = [
      {
        userName: 'user1',
        firstName: 'asd',
        lastName: 'qweqw',
        age: 12,
        salary: 21,
        id: 1,
      },
      {
        userName: '123',
        firstName: '312312',
        lastName: '3123',
        age: 12,
        salary: 123,
        id: 2,
      },
    ];
    localStorage.userList = JSON.stringify(users);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get getDefaultOptions', () => {
    const getDefaultOptions: jasmine.Spy = spyOn(
      component,
      'getDefaultOptions'
    ).and.callThrough();
    component.getDefaultOptions();
    expect(getDefaultOptions).toHaveBeenCalled();
  });

  it('should get refresh', () => {
    const refresh: jasmine.Spy = spyOn(component, 'refresh').and.callThrough();
    const options = {
      sortField: 'firstName',
      sortDirection: 'asc',
      page: 0,
      pageSize: 10,
    };
    component.refresh(options);
    expect(component.refresh).toHaveBeenCalled();
    expect(refresh).toHaveBeenCalled();
  });
});
