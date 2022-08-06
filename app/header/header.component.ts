import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private readonly dataService: DataService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  public login: boolean;
  private loginSubjectSubscription: Subscription;

  ngOnInit(): void {
    this.loginSubjectSubscription = this.dataService.loginSubject.subscribe(
      (data) => {
        this.login = data;
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  logout() {
    localStorage.user = '';
    this.login = false;
    this.dataService.loginSubject.next(false);
  }

  ngOnDestroy(): void {
    this.loginSubjectSubscription.unsubscribe();
  }
}
