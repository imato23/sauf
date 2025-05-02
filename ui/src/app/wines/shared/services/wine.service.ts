import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wine } from '../models/wine.model';
import { Observable, of } from 'rxjs';
import { WineCategory } from '../models/wine-category.model';
import { StorageLocation } from '../models/storage-location.model';
import {environment} from "../../../../environments/environment";

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

  public storageLocationsExist(
    excludedWineId: string,
    excludedVintage: number,
    storageLocations: StorageLocation[]): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.winesApiUrl}/${excludedWineId}/vintage-infos/${excludedVintage}/storage-locations/exist`, storageLocations);
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

  public getAllProducers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.winesApiUrl}/producers`);
  }

  public getAllCountries(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.winesApiUrl}/countries`);
  }

  public getAllRegions(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.winesApiUrl}/regions`);
  }
}
