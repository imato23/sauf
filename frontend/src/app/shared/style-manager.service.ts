import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {
  public isDark = false;

  constructor() {
  }

  private static removeStyle(key: string): void {
    const existingLinkElement = StyleManagerService.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private static getLinkElementForKey(key: string): Element {
    return StyleManagerService.getExistingLinkElementByKey(key) || StyleManagerService.createLinkElementWithKey(key);
  }

  private static getExistingLinkElementByKey(key: string): Element | null {
    return document.head.querySelector(`link[rel="stylesheet"].${StyleManagerService.getClassNameForKey(key)}`);
  }

  private static createLinkElementWithKey(key: string): HTMLLinkElement {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(StyleManagerService.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private static getClassNameForKey(key: string): string {
    return `style-manager-${key}`;
  }

  public toggleDarkTheme(): void {
    if (this.isDark) {
      StyleManagerService.removeStyle('dark-theme');
      document.body.classList.remove('dark-theme');
      this.isDark = false;
    } else {
      const href = 'dark-theme.css';
      StyleManagerService.getLinkElementForKey('dark-theme').setAttribute('href', href);
      document.body.classList.add('dark-theme');
      this.isDark = true;
    }
  }
}


