import {Component} from '@angular/core';
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
import {MatToolbar} from "@angular/material/toolbar";

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
    MatToolbar
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  public history$: Observable<BottleHistoryEntry[]> = of([]);
  public displayedColumns: string[] = ['date', 'wineName', 'producer', 'action'];

  constructor(private historyService: HistoryService) {
    this.history$ = this.historyService.getHistory();
  }
}
