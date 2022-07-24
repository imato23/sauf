import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeChangedSubject: BehaviorSubject<string> = new BehaviorSubject<string>('dark');

  constructor() {
  }

  public get onThemeChanged(): Observable<string> {
    return this.themeChangedSubject.asObservable();
  }

  public getAvailableThemes(): string[] {
    return ['dark', 'wine', 'custom'];
  }

  public getCurrentTheme(): string {
    return this.themeChangedSubject.value;
  }

  public changeTheme(themeName: string): void {
    this.themeChangedSubject.next(themeName);
  }
}
