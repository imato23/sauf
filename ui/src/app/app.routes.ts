import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {WineListComponent} from './wines/wine-list/wine-list.component';
import {WineDetailsComponent} from './wines/wine-details/wine-details.component';
import {VintageDetailsComponent} from './wines/vintage-details/vintage-details.component';
import {RemoveBottleComponent} from './wines/remove-bottle/remove-bottle.component';
import {SettingsComponent} from "./settings/settings/settings.component";
import {HistoryComponent} from "./history/history/history.component";

/**
 * Defines the routes for the application.
 *
 * Structure:
 * - Parent route 'wines' with the following child paths:
 *   - 'wine-list': Displays the WineListComponent.
 *   - 'view-wine/:wineId': Displays the WineDetailsComponent to view details of a specific wine by its ID.
 *   - 'add-wine': Displays the WineDetailsComponent to add a new wine.
 *   - 'view-vintage/:wineId/:vintage': Displays the VintageDetailsComponent to view a specific vintage of a wine by its ID and vintage identifier.
 *   - 'add-vintage/:wineId': Displays the VintageDetailsComponent to add a new vintage for a specific wine by its ID.
 *   - 'remove-bottle/:wineId': Displays the RemoveBottleComponent to handle bottle removal for a specific wine by its ID.
 *   - '': Redirects to the 'wine-list' path when accessing the 'wines' path without a specific child path.
 *
 * - Root routes:
 *   - '': Redirects to '/wines/wine-list' when accessing the base URL of the app.
 *   - '**': Displays the PageNotFoundComponent for any undefined routes.
 */
export const routes: Routes = [
  {
    path: 'wines', children: [
      {path: 'wine-list', component: WineListComponent},
      {path: 'view-wine/:wineId', component: WineDetailsComponent},
      {path: 'add-wine', component: WineDetailsComponent},
      {path: 'view-vintage/:wineId/:vintage', component: VintageDetailsComponent},
      {path: 'add-vintage/:wineId', component: VintageDetailsComponent},
      {path: 'remove-bottle/:wineId', component: RemoveBottleComponent},
      {path: '', redirectTo: 'wine-list', pathMatch: 'full'},
    ],
  },
  {
    path: 'history', children: [
      {path: 'history', component: HistoryComponent},
      {path: '', redirectTo: 'history', pathMatch: 'full'},
    ]
  },
  {
    path: 'settings', children: [
      {path: 'settings', component: SettingsComponent},
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
    ]
  },
  {path: '', redirectTo: '/wines/wine-list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];
