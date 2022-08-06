import { Injectable } from '@angular/core';

import { roles } from './../../assets/mocks/roles';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public user: any;
  public loginSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  getRoles() {
    return roles;
  }

  setUser(user): void {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserList() {
    if (localStorage.userList) {
      return JSON.parse(localStorage.userList);
    }
    return [];
  }

  findUsers(options): Observable<any> {
    let data = this.getUserList();
    const start = options.page * options.pageSize;
    const end = start + options.pageSize;
    const newData = data.slice(start, end);

    if (JSON.parse(localStorage.user).includes('admin')) {
      data = data.filter((d) => d.userName === JSON.parse(localStorage.user));
    }

    data = data.sort((a, b) => {
      const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
      const valueA = a[options.sortField];
      const valueB = b[options.sortField];

      const result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return result * sortOrder;
    });

    return of({
      items: newData,
      total: data.length,
    });
  }
}
