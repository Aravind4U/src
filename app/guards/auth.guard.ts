import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dataService: DataService) {}

  canActivate() {
    const roles = this.dataService.getRoles();
    const userData = this.dataService.getUser();
    if (userData) {
      const admin = roles.filter((role) => {
        return (
          role.username === userData.username &&
          role.username === userData.password
        );
      });

      const user = this.dataService.getUserList().filter((u) => {
        return (
          u.userName === userData.username && u.userName === userData.password
        );
      });

      if (user.length > 0) {
        localStorage.user = JSON.stringify(user[0].userName);
        this.dataService.loginSubject.next(true);
        return true;
      } else if (admin.length > 0) {
        localStorage.user = JSON.stringify(admin[0].username);
        this.dataService.loginSubject.next(true);
        return true;
      }
      alert('User doesn\'t exists');
    } else if (localStorage.user) {
      this.dataService.loginSubject.next(true);
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
