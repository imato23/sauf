import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeChangedSubject: Subject<string> = new Subject<string>();
  private currentTheme = 'dark';

  constructor() { }

  public get onThemeChanged(): Observable<string> {
    return this.themeChangedSubject.asObservable();
  }

  public getAvailableThemes(): string[] {
    return ['dark', 'wine'];
  }

  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  public changeTheme(themeName: string): void {
    this.currentTheme = themeName;
    this.themeChangedSubject.next(themeName);
  }
}
