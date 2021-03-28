import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VintageInfo } from '../models/vintage-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VintageInfoService {
  private vintageInfosUrl = 'api/vintageInfos';  // URL to web api

  constructor(private httpClient: HttpClient) { }

  public addVintageInfo(vintageInfo: VintageInfo): Observable<VintageInfo> {
    return this.httpClient.post<VintageInfo>(this.vintageInfosUrl, vintageInfo);
  }
}
