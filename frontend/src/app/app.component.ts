import { Component } from '@angular/core';
import {StyleManagerService} from './shared/style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'S.A.U.F.';
  public isDark = this.styleManager.isDark;

  constructor(private styleManager: StyleManagerService) {}

  toggleDarkTheme(): void{
    this.styleManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }
}
