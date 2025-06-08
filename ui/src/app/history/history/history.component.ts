import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe} from "@angular/common";
import {HistoryService} from "../shared/services/history.service";
import {Observable, of} from "rxjs";
import {BottleHistoryEntry} from "../shared/models/bottle-history-entry.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {WineListFilterComponent} from "../../wines/wine-list-filter/wine-list-filter.component";
import {WineListFilter} from "../../wines/shared/models/wine-list.filter.model";

@Component({
  selector: 'app-history',
  imports: [
    AsyncPipe,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    WineListFilterComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit, OnDestroy {
  public history$: Observable<BottleHistoryEntry[]> = of([]);
  public displayedColumns: string[] = [];
  private mql!: MediaQueryList;
  private mqlListener!: (event: MediaQueryListEvent) => void;

  constructor(private historyService: HistoryService) {
  }

  ngOnInit() {
    this.mql = window.matchMedia('(max-width: 600px)');
    this.mqlListener = (event) => this.updateColumns(event.matches);
    this.mql.addEventListener('change', this.mqlListener);
    this.updateColumns(this.mql.matches);
  }

  ngOnDestroy() {
    this.mql.removeEventListener('change', this.mqlListener);
  }

  public onFilterChanged(filter: WineListFilter) {
    this.history$ = this.historyService.getHistory(filter);
  }

  private updateColumns(isMobile: boolean) {
    if (isMobile) {
      this.displayedColumns = ['date', 'wineName+producer', 'action'];
    } else {
      this.displayedColumns = ['date', 'wineName', 'producer', 'action'];
    }
  }
}
