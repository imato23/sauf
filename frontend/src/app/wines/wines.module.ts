import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';

import { WinesRoutingModule } from './wines-routing.module';
import { WineListComponent } from './wine-list/wine-list.component';
import { SharedModule } from '../shared/shared.module';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import { ImageCapturingComponent } from './image-capturing/image-capturing.component';
import { VintageDetailsComponent } from './vintage-details/vintage-details.component';
import { StoreBottlesComponent } from './store-bottles/store-bottles.component';


@NgModule({
  declarations: [WineListComponent, WineDetailsComponent, ImageCapturingComponent, VintageDetailsComponent, StoreBottlesComponent],
  imports: [
    CommonModule,
    WinesRoutingModule,
    SharedModule,
    WebcamModule,
  ]
})
export class WinesModule { }
