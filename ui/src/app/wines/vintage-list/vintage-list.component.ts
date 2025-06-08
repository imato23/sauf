import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {Wine} from "../shared/models/wine.model";

@Component({
  selector: 'app-vintage-list',
  imports: [
    MatButton,
    MatListItem,
    MatNavList,
    RouterLink
  ],
  templateUrl: './vintage-list.component.html',
  styleUrl: './vintage-list.component.scss'
})
export class VintageListComponent {
  @Input()
  public wine!: Wine
}
