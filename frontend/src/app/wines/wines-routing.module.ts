import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine-list/wine-list.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import { VintageDetailsComponent } from './vintage-details/vintage-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'wine-list', pathMatch: 'full' },
  { path: 'wine-list', component: WineListComponent },
  { path: 'view-wine/:wineId', component: WineDetailsComponent },
  { path: 'add-wine', component: WineDetailsComponent },
  { path: 'view-vintage/:wineId/:vintage', component: VintageDetailsComponent },
  { path: 'add-vintage/:wineId', component: VintageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinesRoutingModule { }
