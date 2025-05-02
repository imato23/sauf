import { Component } from '@angular/core';
import {NavbarComponent} from "./core/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'S.A.U.F.';
}
