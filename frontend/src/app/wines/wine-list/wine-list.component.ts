import { Component, OnInit } from '@angular/core';
import { Wine } from '../shared/models/wine.model';
import { WineService } from '../shared/services/wine.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent implements OnInit {
  public wines$: Observable<Wine[]>;

  constructor(wineService: WineService) {
    this.wines$ = wineService.getWines();
  }

  public getNumberOfBottles(wine: Wine): number {
    return wine.vintageInfos.reduce((sum, current) => sum + current.numberOfBottles, 0);
  }

  ngOnInit(): void {
  }
}
