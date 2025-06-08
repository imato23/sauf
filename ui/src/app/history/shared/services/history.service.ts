import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BottleHistoryEntry} from "../models/bottle-history-entry.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {WineListFilter} from "../../../wines/shared/models/wine-list.filter.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyApiUrl = `${environment.apiUrl}/history`;

  constructor(private httpClient: HttpClient) {
  }

  public getHistory(filter: WineListFilter): Observable<BottleHistoryEntry[]> {
    let params: HttpParams = new HttpParams();

    if (!filter) {
      return this.httpClient.get<BottleHistoryEntry[]>(this.historyApiUrl);
    }

    if (filter.wineName) {
      params = params.append('wineName', filter.wineName);
    }

    if (filter.producer) {
      params = params.append('producer', filter.producer);
    }

    return this.httpClient.get<BottleHistoryEntry[]>(this.historyApiUrl, {'params': params});
  }
}
