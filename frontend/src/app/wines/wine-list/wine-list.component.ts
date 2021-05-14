import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Wine } from '../shared/models/wine.model';
import { WineService } from '../shared/services/wine.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { NavbarService } from 'src/app/core/shared/navbar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { WineCategory } from '../shared/models/wine-category.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WineListComponent implements OnInit {
  @ViewChild('searchField') searchField!: ElementRef;
  public wines$: Observable<Wine[]>;
  public dummyAvatar = 'assets/dummy-avatar.png';
  public isSearchActive = false;
  public searchControl: FormControl = new FormControl('');

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private wineService: WineService, private navbarService: NavbarService, private breakpointObserver: BreakpointObserver) {
    this.wines$ = this.processSearchPattern(this.searchControl.valueChanges);
  }

  ngOnInit(): void {
  }

  public onToggleNavbar(): void {
    this.navbarService.toogleNavbar();
  }

  public onActivateSearch(): void {
    this.isSearchActive = true;
    setTimeout(() => this.searchField.nativeElement.focus(), 0);
  }

  private processSearchPattern(searchPatterns$: Observable<string>): Observable<Wine[]> {
    return searchPatterns$.pipe(
      startWith(''),
      //debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.filterWines(term)));
  }

  private filterWines(searchPattern: string): Observable<Wine[]> {
    return this.wineService.getWines().pipe(
      map((wines: Wine[]) => wines.filter((wine: Wine) =>
        searchPattern === '' ||
        wine.name.toLowerCase().includes(searchPattern.toLowerCase()) ||
        this.translateWineCategory(wine.category).toLowerCase().includes(searchPattern.toLowerCase()) ||
        wine.producer.toLowerCase().includes(searchPattern.toLowerCase()))));
  }

  private translateWineCategory(category: WineCategory): string {
    switch (category) {
      case WineCategory.RedWine:
        return 'Rotwein';
      case WineCategory.WhiteWine:
        return 'Weißwein';
      case WineCategory.RoseWine:
        return 'Roséwein';
      case WineCategory.SparklingWine:
        return 'Schaumwein';
      default:
        throw Error(`The wine category '${category}' is unknown.`);
    }
  }
}
