import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { WineListComponent } from './wines/wine-list/wine-list.component';
import { WineDetailsComponent } from './wines/wine-details/wine-details.component';
import { VintageDetailsComponent } from './wines/vintage-details/vintage-details.component';
import { RemoveBottleComponent } from './wines/remove-bottle/remove-bottle.component';

export const routes: Routes = [
  {
    path: 'wines', children: [
      { path: 'wine-list', component: WineListComponent },
      { path: 'view-wine/:wineId', component: WineDetailsComponent },
      { path: 'add-wine', component: WineDetailsComponent },
      { path: 'view-vintage/:wineId/:vintage', component: VintageDetailsComponent },
      { path: 'add-vintage/:wineId', component: VintageDetailsComponent },
      { path: 'remove-bottle/:wineId', component: RemoveBottleComponent },
      { path: '', redirectTo: 'wine-list', pathMatch: 'full' },
    ],
  },
  //{ path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: '', redirectTo: '/wines/wine-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
