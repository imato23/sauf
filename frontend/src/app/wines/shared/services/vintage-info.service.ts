import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VintageInfo } from '../models/vintage-info.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VintageInfoService {
  private vintageInfoApiUrl = `${environment.apiUrl}/wines`;

  constructor(private httpClient: HttpClient) { }

  public getVintageInfo(wineId: string, vintage: number): Observable<VintageInfo> {
    return this.httpClient.get<VintageInfo>(`${this.buildUrl(wineId)}/${vintage}`);
  }

  public addVintageInfo(wineId: string, vintageInfo: VintageInfo): Observable<VintageInfo> {
    return this.httpClient.post<VintageInfo>(this.buildUrl(wineId), vintageInfo);
  }

  public updateVintageInfo(wineId: string, vintage: number, vintageInfo: VintageInfo) {
    return this.httpClient.put<VintageInfo>(`${this.buildUrl(wineId)}/${vintage}`, vintageInfo);
  }

  public removeVintageInfo(wineId: string, vintage: number) {
    return this.httpClient.delete<VintageInfo>(`${this.buildUrl(wineId)}/${vintage}`);
  }

  private buildUrl(wineId: string): string {
    return `${this.vintageInfoApiUrl}/${wineId}/vintage-infos`;
  }
}
