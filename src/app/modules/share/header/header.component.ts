import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"
import { filter } from 'rxjs/operators';
import { Subscription } from "rxjs";

@Component({
  selector: 'ls-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private buttonIcon: string = 'person_add';
  private routerLink: string = '/register';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.subscribeNavigation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscribeNavigation(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.changeNavigation(event);
    });
  }

  changeNavigation(event): void {
    this.buttonIcon = event.urlAfterRedirects === "/register" ? 'person' : 'person_add';
    this.routerLink = event.urlAfterRedirects === "/register" ? '/login' : '/register';
  }
}
