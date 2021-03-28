import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinesRoutingModule } from './wines-routing.module';
import { WineListComponent } from './wine-list/wine-list.component';
import { SharedModule } from '../shared/shared.module';
import { ViewWineComponent } from './view-wine/view-wine.component';


@NgModule({
  declarations: [WineListComponent, ViewWineComponent],
  imports: [
    CommonModule,
    WinesRoutingModule,
    SharedModule
  ]
})
export class WinesModule { }
