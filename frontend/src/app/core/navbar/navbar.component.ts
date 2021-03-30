import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NavbarService } from '../shared/navbar.service';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('drawer', { static: true })
  drawer!: MatDrawer;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private navbarToggleRequestedSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private navbarService: NavbarService) {
    this.navbarToggleRequestedSubscription = this.navbarService.navbarToggleRequested$.subscribe(() => this.drawer.toggle());
  }

  ngOnDestroy(): void {
    this.navbarToggleRequestedSubscription.unsubscribe();
  }
}
