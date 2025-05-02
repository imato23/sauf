import {Component, ViewChild, OnDestroy, inject, signal} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { NavbarService } from '../shared/navbar.service';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLinkActive,
    RouterOutlet,
    MatSidenavContainer,
    MatSidenavModule,
    MatToolbar,
    MatNavList,
    MatListItem,
    MatIcon,
    RouterLink,
    MatSidenav,
    MatIconButton
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('drawer', { static: true })
  drawer!: MatDrawer;

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  protected readonly Date = Date;
}
