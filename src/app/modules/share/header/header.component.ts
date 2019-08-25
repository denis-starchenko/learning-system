import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from "rxjs";
import { UserInfoService } from "./user-info.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'ls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private navSubscription: Subscription;
  private authSubscription: Subject<any> = new Subject();
  private userInfoSubscription: Subject<any> = new Subject();
  private buttonIcon: string = 'person_add';
  private routerLink: string = '/register';
  private router: Router;
  private authService: AuthService;
  private userInfoService: UserInfoService;
  private userInfo = {
    firstName: '',
    lastName: ''
  };

  constructor(router: Router, auth: AuthService, userInfo: UserInfoService) {
    this.router = router;
    this.authService = auth;
    this.userInfoService = userInfo;
  }

  ngOnInit() {
    this.subscribeNavigation();
    this.subscribeAuthService();
  }

  subscribeNavigation(): void {
    this.navSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.changeNavigation(event);
      this.clearUserInfo(event.urlAfterRedirects);
    });
  }

  subscribeAuthService(): void {
    this.authService
      .getObservable()
      .pipe(takeUntil(this.authSubscription))
      .subscribe(() => this.subscribeUserInfoService());
  }

  subscribeUserInfoService(): void {
    this.userInfoService
      .getUserInfo()
      .pipe(takeUntil(this.userInfoSubscription))
      .subscribe(user => this.userHandler(user));
  }

  changeNavigation(event): void {
    this.buttonIcon = event.urlAfterRedirects === "/register" ? 'person' : 'person_add';
    this.routerLink = event.urlAfterRedirects === "/register" ? '/login' : '/register';
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe(): void {
    this.navSubscription.unsubscribe();
    this.authSubscription.next();
    this.authSubscription.complete();
    this.userInfoSubscription.next();
    this.userInfoSubscription.complete();
  }

  userHandler(user) {
    if (user.token) {
      this.userInfo = {
        firstName: user.user.firstName,
        lastName: user.user.lastName
      }
    } else {
      this.router.navigateByUrl('/register');
    }
  }

  logOut() {
    this.router.navigateByUrl('/login');
  }

  clearUserInfo(url) {
    if (url === '/login') {
      this.userInfo = {
        firstName: '',
        lastName: ''
      };
    }
  }
}
