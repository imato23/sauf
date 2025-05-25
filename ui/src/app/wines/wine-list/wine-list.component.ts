import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Wine} from '../shared/models/wine.model';
import {WineService} from '../shared/services/wine.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatListItem, MatListItemAvatar, MatListItemLine, MatListItemTitle, MatNavList} from '@angular/material/list';
import {WineListFilterComponent} from "../wine-list-filter/wine-list-filter.component";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {WineListFilter} from "../shared/models/wine-list.filter.model";

@Component({
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    MatListItemTitle,
    MatListItemAvatar,
    MatListItemLine,
    WineListFilterComponent,
    NgIf,
    MatNavList,
    MatListItem,
    MatIcon,
    NgForOf,
    MatFabButton,
  ],
  selector: 'app-wine-list',
  styleUrl: './wine-list.component.scss',
  templateUrl: './wine-list.component.html',
})
export class WineListComponent {
  public wines$: Observable<Wine[]> = of([]);
  public dummyAvatar: string = 'assets/no-wine-photo-avatar.png';

  @Output() filterChanged: EventEmitter<WineListFilter> = new EventEmitter<WineListFilter>();

  constructor(private wineService: WineService) {
  }

  public onFilterChanged(filter: WineListFilter) {
    this.wines$ = this.wineService.getWines(filter);
  }
}
