import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user', () => {
    const setUserSpy: jasmine.Spy = spyOn(service, 'setUser').and.callThrough();
    const user = {};
    service.setUser(user);
    expect(setUserSpy).toHaveBeenCalled();
  });

  it('should get user', () => {
    const getUserSpy: jasmine.Spy = spyOn(service, 'getUser').and.callThrough();
    service.getUser();
    expect(getUserSpy).toHaveBeenCalled();
  });

  it('should get roles', () => {
    const getRolesSpy: jasmine.Spy = spyOn(
      service,
      'getRoles'
    ).and.callThrough();
    service.getRoles();
    expect(getRolesSpy).toHaveBeenCalled();
  });

  it('should get userList', () => {
    const userList: jasmine.Spy = spyOn(
      service,
      'getUserList'
    ).and.callThrough();
    service.getUserList();
    expect(userList).toHaveBeenCalled();
  });

  it('should findUsers', () => {
    const options = {
      sortField: 'firstName',
      sortDirection: 'asc',
      page: 0,
      pageSize: 10,
    };
    const role = 'admin';
    localStorage.user = JSON.stringify(role);
    const findUsersSpy: jasmine.Spy = spyOn(
      service,
      'findUsers'
    ).and.callThrough();
    service.findUsers(options);
    expect(findUsersSpy).toHaveBeenCalled();
  });
});
