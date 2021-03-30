import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WineListComponent } from './wine-list/wine-list.component';
import { ViewWineComponent } from './view-wine/view-wine.component';

const routes: Routes = [
  { path: '', redirectTo: 'wine-list', pathMatch: 'full' },
  { path: 'wine-list', component: WineListComponent },
  { path: 'view-wine/:wineId', component: ViewWineComponent },
  { path: 'add-wine', component: ViewWineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinesRoutingModule { }
