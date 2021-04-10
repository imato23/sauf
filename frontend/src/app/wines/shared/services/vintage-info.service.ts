import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VintageInfo } from '../models/vintage-info.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageLocation } from '../models/storage-location.model';

@Injectable({
  providedIn: 'root'
})
export class VintageInfoService {
  private vintageInfoApiUrl = `${environment.apiUrl}/wines`;

  constructor(private httpClient: HttpClient) { }

  public getAllVintageInfo(wineId: string): Observable<VintageInfo[]> {
    return this.httpClient.get<VintageInfo[]>((this.buildUrl(wineId)));
  }

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

  public removeBottle(wineId: string, vintage: number, storageLocation: StorageLocation): Observable<any> {
    const url = `${this.buildUrl(wineId)}/${vintage}/storage-locations/${storageLocation.row}/${storageLocation.shelf}`;
    return this.httpClient.delete(url);
  }

  private buildUrl(wineId: string): string {
    return `${this.vintageInfoApiUrl}/${wineId}/vintage-infos`;
  }
}
