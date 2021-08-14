import { Component } from '@angular/core';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'S.A.U.F.';

  public currentTheme = 'dark';

  constructor(private themeService: ThemeService) {
    this.themeService.onThemeChanged.subscribe((themeName: string) => {
      this.currentTheme = themeName;
    });
  }
}
