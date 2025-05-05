import {Component, inject, OnDestroy, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
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
  @ViewChild('drawer', {static: true})
  drawer!: MatDrawer;

  protected readonly isMobile: WritableSignal<boolean> = signal(true);

  private readonly mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  constructor() {
    const media: MediaMatcher = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this.mobileQuery.matches);
    this.mobileQueryListener = () => this.isMobile.set(this.mobileQuery.matches);
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
