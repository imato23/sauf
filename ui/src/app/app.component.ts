import {Component} from '@angular/core';
import {NavbarComponent} from "./core/navbar/navbar.component";

/**
 * Represents the root component of the application.
 *
 * This component serves as the entry point for the Angular application. It defines
 * the main template and styling for the root of the application and provides
 * integration with imported components.
 *
 * Features:
 * - Incorporates the `NavbarComponent` for displaying navigation elements.
 * - Uses the `app-root` selector to identify where this component should be
 * rendered in the DOM.
 * - Incorporates styles defined in `app.component.scss`.
 *
 * Attributes:
 * - `title`: The title of the application, used for display or metadata.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'S.A.U.F.';
}
