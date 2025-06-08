import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BottleHistoryEntry} from "../models/bottle-history-entry.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyApiUrl = `${environment.apiUrl}/history`;

  constructor(private httpClient: HttpClient) {
  }

  public getHistory(): Observable<BottleHistoryEntry[]> {
    const url = `${this.historyApiUrl}`;
    return this.httpClient.get<BottleHistoryEntry[]>(url);
  }
}
