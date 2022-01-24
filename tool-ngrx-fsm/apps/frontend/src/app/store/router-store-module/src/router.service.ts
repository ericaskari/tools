import { Injectable } from '@angular/core';
import { NavigationEnd, QueryParamsHandling, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class RouterService {
  constructor(private router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      //
      if (event instanceof RouterEvent) {
        //
      }
    });
  }

  get bottomNavigationRef(): any {
    return {
      nativeElement: {
        selectedIndex: 0
      }
    };
  }

  set bottomNavigationRef(bottomNavRef: any) {
    // void
  }

  goBack(args?: any): void {
    this.router.navigate([args]);
  }

  loginRedirect(): Observable<boolean> {
    return from(this.router.navigate(['/home'], { replaceUrl: true }));
  }

  logoutRedirect(): Observable<boolean> {
    return from(this.router.navigate(['/login'], { replaceUrl: true }));
  }

  navigate(path: string[], options?: any, queryParams?: { [key: string]: string }, queryParamHandling?: QueryParamsHandling): Promise<boolean> {
    return this.router.navigate(path, {
      queryParams: queryParams,
      queryParamsHandling: queryParamHandling,
      relativeTo: options.relativeTo || ''
    });
  }
}
