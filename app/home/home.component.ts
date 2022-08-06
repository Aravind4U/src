import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public users = [];
  public tableColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'salary',
    'age',
    'action',
    'action-edit',
  ];
  public resultsLength = 0;
  public pagesize = 10;
  public isAdmin: boolean = JSON.parse(localStorage.user).includes('admin');
  private findUserSubscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.refresh(this.getDefaultOptions());
  }

  ngOnDestroy(): void {
    this.findUserSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe(
        (sort: Sort) => {
          this.paginator.pageIndex = 0;
          this.refresh(this.getCurrentOptions());
        }
      );

      this.paginator.page.subscribe(
        (page: PageEvent) => {
          this.refresh(this.getCurrentOptions());
        }
      );
    }
  }

  deleteUser(id) {
    const userData = JSON.parse(localStorage.userList);
    const filteredData = userData.filter((user) => user.id !== id);
    localStorage.userList = JSON.stringify(filteredData);
    this.refresh(this.getCurrentOptions());
  }

  refresh(options) {
    this.findUserSubscription = this.dataService
      .findUsers(options)
      .subscribe((result) => {
        this.resultsLength = result.total;
        this.users = result.items;
      });
  }

  getCurrentOptions() {
    const options = {
      sortField: this.sort.active,
      sortDirection: this.sort.direction,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    };

    return options;
  }

  getDefaultOptions() {
    const options = {
      sortField: 'firstName',
      sortDirection: 'asc',
      page: 0,
      pageSize: this.pagesize,
    };

    return options;
  }
}
