import { Component, OnInit } from '@angular/core';
import { Wine } from '../shared/models/wine.model';
import { WineService } from '../shared/services/wine.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavbarService } from 'src/app/core/shared/navbar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent implements OnInit {
  public wines$: Observable<Wine[]>;
  public dummyAvatar = 'assets/dummy-avatar.png';

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(wineService: WineService, private navbarService: NavbarService, private breakpointObserver: BreakpointObserver) {
    this.wines$ = wineService.getWines();
  }

  public getNumberOfBottles(wine: Wine): number {
    return wine.vintageInfos.reduce((sum, current) => sum + current.numberOfBottles, 0);
  }

  ngOnInit(): void {
  }

  public toggleNavbar(): void {
    this.navbarService.toogleNavbar();
  }
}
