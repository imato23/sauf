import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';

import { WinesRoutingModule } from './wines-routing.module';
import { WineListComponent } from './wine-list/wine-list.component';
import { SharedModule } from '../shared/shared.module';
import { WineDetailsComponent } from './wine-details/wine-details.component';


@NgModule({
  declarations: [WineListComponent, WineDetailsComponent],
  imports: [
    CommonModule,
    WinesRoutingModule,
    SharedModule,
    WebcamModule,
  ]
})
export class WinesModule { }
