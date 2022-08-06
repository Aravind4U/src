import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { roles } from './../../assets/mocks/roles';
import { Subject } from 'rxjs';

describe('AuthGuard', () => {
  const mockedUserList = [
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

  const mockedUser = { password: 'user1', username: 'user1' };
  const mockedAdmin = { password: 'admin', userName: 'admin' };
  const mockedNoUser = { password: 'user2', username: 'user2' };
  const mockedRoles = roles;

  let dataService: DataService;
  const loginSubject$: Subject<boolean> = new Subject<boolean>();
  const mockedDataService = {
    ...jasmine.createSpyObj('DataService', [
      'getRoles',
      'getUserList',
      'getUser',
      'loginSubject',
    ]),
    loginSubject: loginSubject$,
  };

  let authGuard: AuthGuard;
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  // const authMock = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn']);

  beforeEach(() => {
    const role = 'admin';
    localStorage.user = JSON.stringify(role);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [
        { provide: DataService, useValue: mockedDataService },
        { provide: Router, useValue: routerMock },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('able to hit route when user is not logged in', () => {
    mockedDataService.getRoles.and.returnValue(mockedRoles);
    mockedDataService.getUser.and.returnValue(mockedUser);
    mockedDataService.getUserList.and.returnValue(mockedUserList);
    expect(authGuard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
    mockedDataService.getRoles.and.returnValue(mockedRoles);
    mockedDataService.getUser.and.returnValue(mockedAdmin);
    mockedDataService.getUserList.and.returnValue(mockedUserList);
    expect(authGuard.canActivate()).toBe(false);
  });

  it('should alert when user not found', () => {
    mockedDataService.getRoles.and.returnValue(mockedRoles);
    mockedDataService.getUser.and.returnValue(mockedNoUser);
    mockedDataService.getUserList.and.returnValue(mockedUserList);
    expect(authGuard.canActivate()).toBe(false);
  });

  it('should alert when form is not valid', () => {
    mockedDataService.getRoles.and.returnValue(mockedRoles);
    mockedDataService.getUser.and.returnValue(undefined);
    mockedDataService.getUserList.and.returnValue(mockedUserList);
    expect(authGuard.canActivate()).toBe(true);
  });
});
