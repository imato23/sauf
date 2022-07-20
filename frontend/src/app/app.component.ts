import { Component } from '@angular/core';
import { ThemeService } from './shared/theme.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'S.A.U.F.';

  public currentTheme!: string;

  constructor(private themeService: ThemeService) {
    this.themeService.onThemeChanged.subscribe((theme: string) => {
      this.currentTheme = theme;
    });

    // this.themeService.onThemeChanged.subscribe((themeName: string) => {
    //   this.currentTheme = themeName;
    // });
  }
}
