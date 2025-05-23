import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

/**
 * Represents the PageNotFoundComponent, which is used to display a standard
 * "Page Not Found" message or screen within the application. This component
 * serves as a user-friendly response when the user navigates to a route
 * that does not exist.
 *
 * The component leverages Angular Material components for styling and layout.
 * It includes a MatCard container with a title and an icon to provide a
 * consistent and visually appealing design.
 *
 * The component is declared as standalone using Angular's `@Component` decorator
 * and can be used wherever routing requires a fallback or error page for invalid URLs.
 *
 * This component should be registered with the Angular Router to be used
 * as the default page for undefined routes.
 */
@Component({
  selector: 'app-page-not-found',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
}
