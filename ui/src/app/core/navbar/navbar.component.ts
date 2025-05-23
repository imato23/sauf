import {Component, inject, OnDestroy, signal, ViewChild, WritableSignal} from '@angular/core';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {VersionComponent} from "../version/version.component";

/**
 * NavbarComponent is responsible for rendering a navigation bar with responsive behavior
 * based on the screen size. It uses Angular Material components and listens for media
 * query changes to adapt its layout for mobile and desktop devices.
 *
 * This component:
 * - Provides a navigation interface with a toggleable sidenav for smaller screens.
 * - Listens to media query changes to update the mobile view state.
 * - Uses the Angular Material library for styling and layout.
 *
 * Main Features:
 * - Toggles the sidenav drawer based on screen size.
 * - Automatically updates its `isMobile` state based on a media query for devices with a max-width of 600 px.
 * - Cleans up listeners when the component is destroyed to prevent memory leaks.
 *
 * Decorator Metadata:
 * - `selector`: Specifies the custom element tag (`app-navbar`) used to include this component in other templates.
 * - `templateUrl`: Path to the template file for the component's HTML structure.
 * - `imports`: Lists Angular Material modules and other dependencies used within the component.
 * - `styleUrls`: Path to the component's SCSS file for custom styles.
 */
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
    MatIconButton,
    VersionComponent
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  @ViewChild('drawer', {static: true})
  drawer!: MatDrawer;

  protected readonly isMobile: WritableSignal<boolean> = signal(true);

  private readonly mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  /**
   * Constructor initializes the state for mobile query checking. It sets up a listener to detect
   * changes in media query matching for screens with a max-width of 600 px.
   */
  constructor() {
    const media: MediaMatcher = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this.mobileQuery.matches);
    this.mobileQueryListener = () => this.isMobile.set(this.mobileQuery.matches);
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  /**
   * Lifecycle hook that is called when the component is being destroyed.
   * Performs cleanup logic to remove event listeners and free up resources.
   *
   * @return {void} No return value.
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
