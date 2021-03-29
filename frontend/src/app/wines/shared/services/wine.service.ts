import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wine } from '../models/wine.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WineCategory } from '../models/wine-category.model';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private winesApiUrl = `${environment.apiUrl}/wines`;

  constructor(private httpClient: HttpClient) { }

  public getWine(wineId: string): Observable<Wine> {
    const url = `${this.winesApiUrl}/${wineId}`;
    return this.httpClient.get<Wine>(url);
  }

  public getWines(): Observable<Wine[]> {
    return this.httpClient.get<Wine[]>(this.winesApiUrl);
  }

  public addWine(wine: Wine): Observable<Wine> {
    return this.httpClient.post<Wine>(this.winesApiUrl, wine);
  }

  public updateWine(id: string, wine: Wine): Observable<Wine> {
    return this.httpClient.put<Wine>(`${this.winesApiUrl}/${id}`, wine);
  }

  public deleteWine(wineId: string): Observable<Wine> {
    return this.httpClient.delete<Wine>(`${this.winesApiUrl}/${wineId}`);
  }

  public getWineCategories(): Observable<string[]> {
    const enumKeys: string[] = Object.keys(WineCategory);
    return of(enumKeys);
  }
}
