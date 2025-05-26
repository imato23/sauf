import {Injectable, signal, WritableSignal} from '@angular/core';
import {Theme} from "../models/theme.enum";

@Injectable({
  providedIn: 'root'
})
/**
 * The theme service
 */
export class ThemeService {
  public isDarkMode: WritableSignal<boolean> = signal(false);
  private readonly localStorageThemeKey: string = 'theme';

  constructor() {
    const currentTheme: Theme = this.loadThemeFromLocalStorage();
    this.informAboutCurrentTheme(currentTheme);
    this.subscribeToSystemThemeChanges();
  }

  /**
   * Gets the current theme from the local storage
   * @returns ThemeEnum
   */
  public loadThemeFromLocalStorage(): Theme {
    const themeString: string | null = localStorage.getItem(this.localStorageThemeKey);

    if (!themeString) {
      return Theme.system;
    }

    return this.getThemeEnumFromString(themeString);
  }

  /**
   * Saves the current theme in the local storage
   * @param theme - The theme
   */
  public saveThemeToLocalStorage(theme: Theme): void {
    localStorage.setItem(this.localStorageThemeKey, theme);
  }

  /**
   * Applies the theme to application
   * @param theme - The theme to apply
   */
  public applyTheme(theme: Theme): void {
    for (const themeValue of Object.values(Theme)) {
      document.body.classList.remove(themeValue);
    }

    document.body.classList.add(theme);

    this.informAboutCurrentTheme(theme);
  }

  /**
   * Gets the theme enum from the theme string
   * @param themeString - The theme string
   * @returns The theme enum or null
   */
  public getThemeEnumFromString(themeString: string): Theme {
    if (!Object.values(Theme).includes(themeString as Theme)) {
      throw new Error(`Theme string ${themeString} does not exist in theme enum`);
    }

    return themeString as Theme;
  }

  private informAboutCurrentTheme(theme: Theme): void {
    if (theme === Theme.system) {
      this.isDarkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      this.isDarkMode.set(theme === Theme.dark);
    }
  }

  private subscribeToSystemThemeChanges(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event: MediaQueryListEvent) => {
      const isDarkMode = event.matches;
      this.isDarkMode.set(isDarkMode);
    });
  }
}
