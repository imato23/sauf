import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine-list/wine-list.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import { VintageDetailsComponent } from './vintage-details/vintage-details.component';
import { RemoveBottleComponent } from './remove-bottle/remove-bottle.component';

const routes: Routes = [
  { path: 'wine-list', component: WineListComponent },
  { path: 'view-wine/:wineId', component: WineDetailsComponent },
  { path: 'add-wine', component: WineDetailsComponent },
  { path: 'view-vintage/:wineId/:vintage', component: VintageDetailsComponent },
  { path: 'add-vintage/:wineId', component: VintageDetailsComponent },
  { path: 'remove-bottle/:wineId', component: RemoveBottleComponent },
  { path: '', redirectTo: 'wine-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinesRoutingModule { }
