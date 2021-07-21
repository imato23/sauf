import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Wine } from '../shared/models/wine.model';
import { WineService } from '../shared/services/wine.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { NavbarService } from 'src/app/core/shared/navbar.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { WineCategory } from '../shared/models/wine-category.model';
import { MatMenuItem } from '@angular/material/menu';
import { FilterItem } from '../shared/models/filter-item.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss'],
})
export class WineListComponent implements OnInit {
  @ViewChild('searchField') searchField!: ElementRef;
  public wines$: Observable<Wine[]>;
  public dummyAvatar = 'assets/no-wine-photo.png';
  public isSearchActive = false;
  public searchControl: FormControl = new FormControl('');
  public filterItems: FilterItem[] = [
    { displayName: 'Alle', searchPattern: '', selected: true },
    { displayName: this.translateWineCategory(WineCategory.RedWine), searchPattern: 'rotwein', selected: false },
    { displayName: this.translateWineCategory(WineCategory.RoseWine), searchPattern: 'rosewein', selected: false },
    { displayName: this.translateWineCategory(WineCategory.WhiteWine), searchPattern: 'weißwein', selected: false },
    { displayName: this.translateWineCategory(WineCategory.SparklingWine), searchPattern: 'schaumwein', selected: false },
  ];

  public isFilterActive$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private wineService: WineService, private navbarService: NavbarService, private breakpointObserver: BreakpointObserver) {
    this.wines$ = this.processSearchPattern(this.searchControl.valueChanges);
    this.isFilterActive$.subscribe(x => console.log('Filter active: ' + x));
  }

  ngOnInit(): void {
  }

  public onfilterItemSelected(item: FilterItem): void {
    for (const filterItem of this.filterItems) {
      filterItem.selected = false;
    }

    item.selected = true;

    this.isFilterActive$.next(item.displayName !== 'Alle');

    this.wines$ = this.filterWines(item.searchPattern);
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
    const result = this.wineService.getWines().pipe(
      map((wines: Wine[]) => wines.filter((wine: Wine) =>
        searchPattern === '' ||
        wine.name.toLowerCase().includes(searchPattern.toLowerCase()) ||
        this.translateWineCategory(wine.category).toLowerCase().includes(searchPattern.toLowerCase()) ||
        wine.producer.toLowerCase().includes(searchPattern.toLowerCase())
      )));

    return result;
  }

  private translateWineCategory(category: WineCategory): string {
    switch (category) {
      case WineCategory.RedWine:
        return 'Rotwein';
      case WineCategory.WhiteWine:
        return 'Weißwein';
      case WineCategory.RoseWine:
        return 'Rosewein';
      case WineCategory.SparklingWine:
        return 'Schaumwein';
      default:
        throw Error(`The wine category '${category}' is unknown.`);
    }
  }
}
